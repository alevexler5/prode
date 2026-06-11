import { useEffect, useState } from "react";
import { matchesApi } from "../api/matchesApi";
import { MatchCard } from "../components/MatchCard";
import { Match } from "../types";

export function ResultsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    matchesApi.list().then(setMatches).catch((err) => setError(err instanceof Error ? err.message : "Error"));
  }, []);

  return (
    <section className="page">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Resultados</p>
          <h1>Consultá marcadores reales, sedes y estado de cada cruce.</h1>
          <p className="hero-copy">
            Esta vista deja el fixture en modo solo lectura para revisar lo que ya pasó y lo que viene.
          </p>
        </div>
      </header>

      {error && <p className="error banner">{error}</p>}
      <div className="match-list">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} readonly />
        ))}
      </div>
    </section>
  );
}
