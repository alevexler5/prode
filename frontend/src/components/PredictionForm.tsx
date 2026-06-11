import { FormEvent, useEffect, useState } from "react";
import { Prediction } from "../types";

type Props = {
  prediction?: Prediction;
  disabled: boolean;
  onSave: (input: { predictedHomeScore: number; predictedAwayScore: number }) => Promise<void>;
};

export function PredictionForm({ prediction, disabled, onSave }: Props) {
  const [home, setHome] = useState(prediction?.predictedHomeScore ?? 0);
  const [away, setAway] = useState(prediction?.predictedAwayScore ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setHome(prediction?.predictedHomeScore ?? 0);
    setAway(prediction?.predictedAwayScore ?? 0);
  }, [prediction?.predictedHomeScore, prediction?.predictedAwayScore]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await onSave({ predictedHomeScore: home, predictedAwayScore: away });
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
          onChange={(event) => setHome(Number(event.target.value))}
        />
        <span>:</span>
        <input
          aria-label="Goles visitante"
          type="number"
          min="0"
          max="30"
          value={away}
          disabled={disabled || saving}
          onChange={(event) => setAway(Number(event.target.value))}
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
