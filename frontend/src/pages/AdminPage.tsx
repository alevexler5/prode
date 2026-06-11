import { FormEvent, useEffect, useState } from "react";
import { groupPredictionsApi } from "../api/groupPredictionsApi";
import { matchesApi } from "../api/matchesApi";
import { AdminSummary, Match, User } from "../types";

export function AdminPage({ user }: { user: User | null }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [matchId, setMatchId] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [standingsJson, setStandingsJson] = useState(
    JSON.stringify(
      [
        {
          group: "A",
          team: "Argentina",
          position: 1,
          points: 7,
          goalDifference: 4,
          goalsFor: 6,
          qualifiedAs: "group_winner"
        }
      ],
      null,
      2
    )
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const [items, adminSummary] = await Promise.all([matchesApi.list(), matchesApi.adminSummary()]);
    setMatches(items);
    setSummary(adminSummary);
    setMatchId((current) => current || items[0]?.id || "");
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "No se pudo cargar admin"));
  }, []);

  if (!user?.isAdmin) {
    return (
      <section className="page">
        <p className="error banner">No tenes permisos de administrador.</p>
      </section>
    );
  }

  async function submitResult(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (homeScore === "" || awayScore === "") {
      setError("Completá ambos goles antes de guardar.");
      return;
    }

    try {
      const result = await matchesApi.updateResult(matchId, {
        homeScore: Number(homeScore),
        awayScore: Number(awayScore)
      });
      setMessage(`Resultado guardado y ${result.recalculatedPredictions} predicciones recalculadas.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el resultado");
    }
  }

  async function submitConfirm(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await matchesApi.confirmMatch(matchId, { homeTeam, awayTeam });
      setMessage("Cruce confirmado y predicciones habilitadas.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo confirmar el cruce");
    }
  }

  async function submitStandings(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const standings = JSON.parse(standingsJson) as Array<{
        group: string;
        team: string;
        position: number;
        points: number;
        goalDifference: number;
        goalsFor: number;
        qualifiedAs: string;
      }>;
      await groupPredictionsApi.calculateStandings({ standings });
      setMessage("Standings cargados y ranking recalculado.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar los standings");
    }
  }

  const unresolvedMatches = matches.filter((match) => !match.homeTeam || !match.awayTeam);

  return (
    <section className="page">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Panel operativo para resultados, cruces y recalculo de puntos.</h1>
          <p className="hero-copy">
            Desde aca podés mantener el torneo actualizado y ver el impacto inmediato sobre el ranking.
          </p>
        </div>
      </header>

      {summary && (
        <section className="stats-grid">
          <article className="metric-card">
            <span>Total partidos</span>
            <strong>{summary.total}</strong>
            <small>Fixture cargado</small>
          </article>
          <article className="metric-card">
            <span>Programados</span>
            <strong>{summary.pending}</strong>
            <small>Sin resultado final</small>
          </article>
          <article className="metric-card">
            <span>Habilitados</span>
            <strong>{summary.enabled}</strong>
            <small>Abiertos para prediccion</small>
          </article>
          <article className="metric-card metric-card-dark">
            <span>Finalizados</span>
            <strong>{summary.finished}</strong>
            <small>{summary.missingResults} con inconsistencia de resultado</small>
          </article>
        </section>
      )}

      <div className="admin-layout">
        <section className="surface-card admin-primary">
          <div className="section-title">
            <h2>Cargar resultados reales</h2>
            <span>Recalcula puntajes en el momento</span>
          </div>

          <form className="admin-form-grid" onSubmit={submitResult}>
            <label className="full-width">
              <span>Partido</span>
              <select value={matchId} onChange={(event) => setMatchId(event.target.value)}>
                {matches.map((match) => (
                  <option key={match.id} value={match.id}>
                    {(match.homeTeam ?? match.homePlaceholder) || "Por definir"} vs {(match.awayTeam ?? match.awayPlaceholder) || "Por definir"}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Goles local</span>
              <input type="number" min="0" max="30" value={homeScore} onChange={(event) => setHomeScore(event.target.value)} />
            </label>

            <label>
              <span>Goles visitante</span>
              <input type="number" min="0" max="30" value={awayScore} onChange={(event) => setAwayScore(event.target.value)} />
            </label>

            <div className="full-width action-row">
              <button type="submit" className="button">Guardar resultado</button>
            </div>
          </form>
        </section>

        <aside className="admin-side">
          <form className="surface-card compact-panel" onSubmit={submitConfirm}>
            <div className="section-title">
              <h2>Confirmar cruce</h2>
            </div>
            <label>
              <span>Partido</span>
              <select value={matchId} onChange={(event) => setMatchId(event.target.value)}>
                {unresolvedMatches.map((match) => (
                  <option key={match.id} value={match.id}>
                    {(match.homePlaceholder ?? "Por definir")} vs {(match.awayPlaceholder ?? "Por definir")}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Equipo local</span>
              <input value={homeTeam} onChange={(event) => setHomeTeam(event.target.value)} />
            </label>
            <label>
              <span>Equipo visitante</span>
              <input value={awayTeam} onChange={(event) => setAwayTeam(event.target.value)} />
            </label>
            <button type="submit" className="button button-secondary">Confirmar partido</button>
          </form>

          {summary?.recentActions?.length ? (
            <section className="surface-card compact-panel">
              <div className="section-title">
                <h2>Actividad reciente</h2>
              </div>
              <div className="recent-actions">
                {summary.recentActions.map((action) => (
                  <article key={action.id} className="activity-item">
                    <strong>{action.action}</strong>
                    <p>{action.user.name} · {new Date(action.createdAt).toLocaleString()}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      <form className="surface-card standings-panel" onSubmit={submitStandings}>
        <div className="section-title">
          <h2>Standings de grupos</h2>
          <span>Pegá el JSON y recalculá grupos y mejores terceros</span>
        </div>

        <label>
          <span>JSON standings</span>
          <textarea value={standingsJson} onChange={(event) => setStandingsJson(event.target.value)} rows={12} />
        </label>
        <button type="submit" className="button">Calcular grupos</button>
      </form>

      {message && <p className="success banner">{message}</p>}
      {error && <p className="error banner">{error}</p>}
    </section>
  );
}
