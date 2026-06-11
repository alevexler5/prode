import { useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { getToken } from "../api/client";
import { rankingApi } from "../api/rankingApi";
import { RankingTable } from "../components/RankingTable";
import { RankingRow } from "../types";

export function RankingPage() {
  const [rows, setRows] = useState<RankingRow[]>([]);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    rankingApi.list().then(setRows).catch((err) => setError(err instanceof Error ? err.message : "Error"));
    if (getToken()) {
      authApi.me().then((user) => setCurrentUserId(user.id)).catch(() => setCurrentUserId(null));
    }
  }, []);

  return (
    <section className="page">
      <header className="page-hero ranking-hero">
        <div>
          <p className="eyebrow">Ranking global</p>
          <h1>Seguí cómo viene la tabla general del prode.</h1>
          <p className="hero-copy">
            El desempate sigue exactos, aciertos y cantidad de predicciones cargadas. Tu fila aparece resaltada.
          </p>
        </div>
        <div className="hero-metrics">
          <article className="metric-card">
            <span>Jugadores</span>
            <strong>{rows.length}</strong>
            <small>Usuarios con puntaje en la tabla</small>
          </article>
        </div>
      </header>

      {error && <p className="error banner">{error}</p>}
      <RankingTable rows={rows} currentUserId={currentUserId} />
    </section>
  );
}
