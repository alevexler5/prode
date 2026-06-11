import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { matchesApi } from "../api/matchesApi";
import { predictionsApi } from "../api/predictionsApi";
import { FixtureFilters } from "../components/FixtureFilters";
import { MatchCard } from "../components/MatchCard";
import { Match, Prediction } from "../types";

function getNextOpenMatch(matches: Match[]) {
  return matches.find((match) => {
    const deadline = new Date(new Date(match.kickoff).getTime() - 15 * 60 * 1000);
    return match.isPredictionEnabled && new Date() < deadline;
  });
}

export function FixturePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [filters, setFilters] = useState({ phase: "", group: "", team: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedMatchId, setSavedMatchId] = useState("");
  const deferredTeam = useDeferredValue(filters.team);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [matchList, predictionList] = await Promise.all([matchesApi.list(), predictionsApi.mine()]);
      setMatches(matchList);
      setPredictions(predictionList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar el fixture");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const predictionByMatch = useMemo(() => new Map(predictions.map((prediction) => [prediction.matchId, prediction])), [predictions]);

  const visibleMatches = matches.filter((match) => {
    const home = match.homeTeam ?? match.homePlaceholder ?? "";
    const away = match.awayTeam ?? match.awayPlaceholder ?? "";
    return (
      (!filters.phase || match.phase === filters.phase) &&
      (!filters.group || match.group?.toLowerCase().includes(filters.group.toLowerCase())) &&
      (!deferredTeam ||
        home.toLowerCase().includes(deferredTeam.toLowerCase()) ||
        away.toLowerCase().includes(deferredTeam.toLowerCase()))
    );
  });

  async function savePrediction(matchId: string, input: { predictedHomeScore: number; predictedAwayScore: number }) {
    const existing = predictionByMatch.get(matchId);
    if (existing) {
      await predictionsApi.update(matchId, input);
    } else {
      await predictionsApi.create(matchId, input);
    }
    setSavedMatchId(matchId);
    await load();
  }

  const groupedMatches = visibleMatches.reduce<Record<string, Match[]>>((accumulator, match) => {
    const key = new Date(match.kickoff).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
    accumulator[key] = accumulator[key] ?? [];
    accumulator[key].push(match);
    return accumulator;
  }, {});

  const nextOpenMatch = getNextOpenMatch(matches);
  const predictedMatches = predictions.length;

  return (
    <section className="page">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Fixture</p>
          <h1>Partidos, cierres y tus predicciones en una sola vista.</h1>
          <p className="hero-copy">
            Revisá el calendario del torneo, filtrá cruces y cargá tus resultados antes de que se bloquee cada partido.
          </p>
        </div>
        <div className="hero-metrics">
          <article className="metric-card metric-card-dark">
            <span>Proximo cierre</span>
            <strong>
              {nextOpenMatch
                ? `${nextOpenMatch.homeTeam ?? nextOpenMatch.homePlaceholder} vs ${nextOpenMatch.awayTeam ?? nextOpenMatch.awayPlaceholder}`
                : "Sin partidos abiertos"}
            </strong>
            <small>{nextOpenMatch ? new Date(nextOpenMatch.kickoff).toLocaleString() : "Esperando confirmaciones"}</small>
          </article>
          <article className="metric-card">
            <span>Predicciones cargadas</span>
            <strong>{predictedMatches}</strong>
            <small>Sobre {matches.length} partidos disponibles en el fixture</small>
          </article>
        </div>
      </header>

      <FixtureFilters {...filters} onChange={setFilters} />

      {loading && <p className="muted">Cargando fixture...</p>}
      {error && <p className="error banner">{error}</p>}
      {savedMatchId && <p className="success banner">Prediccion guardada para {savedMatchId}.</p>}
      {!loading && visibleMatches.length === 0 && <p className="muted">No hay partidos para esos filtros.</p>}

      {Object.entries(groupedMatches).map(([date, dayMatches]) => (
        <section key={date} className="day-section">
          <div className="section-title">
            <h2>{date}</h2>
            <span>{dayMatches.length} partidos</span>
          </div>
          <div className="match-list">
            {dayMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                prediction={predictionByMatch.get(match.id)}
                onSavePrediction={savePrediction}
              />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
