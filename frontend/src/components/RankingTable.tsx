import { RankingRow } from "../types";

export function RankingTable({ rows, currentUserId }: { rows: RankingRow[]; currentUserId?: string | null }) {
  return (
    <div className="ranking-surface surface-card">
      <div className="table-wrap">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Partidos</th>
              <th>Grupos</th>
              <th>Exactos</th>
              <th>Aciertos</th>
              <th>Cargadas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.userId} className={row.userId === currentUserId ? "highlight-row" : ""}>
                <td className="position-cell">
                  <span className="position-pill">{row.position}</span>
                </td>
                <td>
                  <div className="user-cell">
                    <span className="user-avatar">{row.name.slice(0, 1).toUpperCase()}</span>
                    <div>
                      <strong>{row.name}</strong>
                      {row.userId === currentUserId && <span className="user-note">Vos</span>}
                    </div>
                  </div>
                </td>
                <td className="total-cell">{row.totalPoints}</td>
                <td>{row.predictionPoints}</td>
                <td>{row.groupPoints}</td>
                <td>{row.exactHits}</td>
                <td>{row.outcomeHits}</td>
                <td>{row.loadedPredictions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
