import { Match, Prediction } from "../types";
import { PredictionForm } from "./PredictionForm";

type Props = {
  match: Match;
  prediction?: Prediction;
  onSavePrediction?: (matchId: string, input: { predictedHomeScore: number; predictedAwayScore: number }) => Promise<void>;
  readonly?: boolean;
};

function isLocked(match: Match) {
  const deadline = new Date(new Date(match.kickoff).getTime() - 15 * 60 * 1000);
  return new Date() >= deadline || match.status === "finished" || match.status === "in_progress";
}

function getStatusLabel(match: Match) {
  if (match.realHomeScore !== null && match.realAwayScore !== null) {
    return "Finalizado";
  }

  if (!match.homeTeam || !match.awayTeam || !match.isPredictionEnabled) {
    return "Pendiente";
  }

  if (match.status === "in_progress") {
    return "En juego";
  }

  return isLocked(match) ? "Bloqueado" : "Editable";
}

function getStatusTone(match: Match) {
  if (match.realHomeScore !== null && match.realAwayScore !== null) return "final";
  if (!match.homeTeam || !match.awayTeam || !match.isPredictionEnabled) return "pending";
  if (match.status === "in_progress") return "live";
  return isLocked(match) ? "locked" : "editable";
}

function formatPhase(phase: string) {
  const labels: Record<string, string> = {
    groups: "Fase de grupos",
    round_of_32: "Dieciseisavos",
    round_of_16: "Octavos",
    quarterfinal: "Cuartos",
    semifinal: "Semifinal",
    final: "Final"
  };

  return labels[phase] ?? phase;
}

function getDeadlineLabel(match: Match) {
  const deadline = new Date(new Date(match.kickoff).getTime() - 15 * 60 * 1000);
  return deadline.toLocaleString();
}

export function MatchCard({ match, prediction, onSavePrediction, readonly = false }: Props) {
  const home = match.homeTeam ?? match.homePlaceholder ?? "Por definir";
  const away = match.awayTeam ?? match.awayPlaceholder ?? "Por definir";
  const confirmed = Boolean(match.homeTeam && match.awayTeam && match.isPredictionEnabled);
  const locked = isLocked(match);
  const disabled = readonly || !confirmed || locked;
  const result = match.realHomeScore !== null && match.realAwayScore !== null
    ? `${match.realHomeScore} : ${match.realAwayScore}`
    : `${prediction?.predictedHomeScore ?? "-"} : ${prediction?.predictedAwayScore ?? "-"}`;

  return (
    <article className={`match-card surface-card tone-${getStatusTone(match)}`}>
      <div className="match-meta">
        <div className="match-time">
          <strong>{new Date(match.kickoff).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong>
          <span>{new Date(match.kickoff).toLocaleDateString()}</span>
        </div>

        <div className="match-location">
          <p>{match.stadium}</p>
          <span>{match.venue}</span>
          <span>{formatPhase(match.phase)}{match.group ? ` · Grupo ${match.group}` : ""}</span>
        </div>
      </div>

      <div className="match-teams">
        <div className="team-block">
          <span className="team-crest">{home.slice(0, 3).toUpperCase()}</span>
          <strong>{home}</strong>
        </div>

        <div className="score-cluster">
          <div className="score-display">{result}</div>
          <span className={`status-badge status-${getStatusTone(match)}`}>{getStatusLabel(match)}</span>
        </div>

        <div className="team-block team-block-away">
          <span className="team-crest">{away.slice(0, 3).toUpperCase()}</span>
          <strong>{away}</strong>
        </div>
      </div>

      <div className="match-side">
        <p className="deadline-label">Cierre: {getDeadlineLabel(match)}</p>

        {!readonly && onSavePrediction && (
          <>
            {!confirmed && <p className="muted helper-text">Se habilita cuando el cruce ya este confirmado.</p>}
            {confirmed && locked && <p className="muted helper-text">La prediccion ya esta bloqueada para este partido.</p>}
            <PredictionForm
              prediction={prediction}
              disabled={disabled}
              onSave={(input) => onSavePrediction(match.id, input)}
            />
          </>
        )}
      </div>
    </article>
  );
}
