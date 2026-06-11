import { FormEvent, useEffect, useState } from "react";
import { Prediction } from "../types";

type Props = {
  prediction?: Prediction;
  disabled: boolean;
  onSave: (input: { predictedHomeScore: number; predictedAwayScore: number }) => Promise<void>;
};

export function PredictionForm({ prediction, disabled, onSave }: Props) {
  const [home, setHome] = useState(prediction ? String(prediction.predictedHomeScore) : "");
  const [away, setAway] = useState(prediction ? String(prediction.predictedAwayScore) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setHome(prediction ? String(prediction.predictedHomeScore) : "");
    setAway(prediction ? String(prediction.predictedAwayScore) : "");
  }, [prediction?.predictedHomeScore, prediction?.predictedAwayScore]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (home === "" || away === "") {
      setError("Completá ambos goles antes de guardar.");
      setSuccess("");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await onSave({ predictedHomeScore: Number(home), predictedAwayScore: Number(away) });
      setSuccess("Guardado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="prediction-form" onSubmit={submit}>
      <div className="score-inputs">
        <input
          aria-label="Goles local"
          type="number"
          min="0"
          max="30"
          value={home}
          disabled={disabled || saving}
          onChange={(event) => setHome(event.target.value)}
        />
        <span>:</span>
        <input
          aria-label="Goles visitante"
          type="number"
          min="0"
          max="30"
          value={away}
          disabled={disabled || saving}
          onChange={(event) => setAway(event.target.value)}
        />
      </div>

      <div className="prediction-actions">
        <button type="submit" className="button" disabled={disabled || saving}>
          {prediction ? "Actualizar" : "Predecir"}
        </button>
        {prediction && <span className="points-badge">{prediction.points} pts</span>}
      </div>

      {success && <p className="success inline-message">{success}</p>}
      {error && <p className="error inline-message">{error}</p>}
    </form>
  );
}
