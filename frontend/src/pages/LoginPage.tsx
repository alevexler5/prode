import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthPageProps } from "../App";
import { authApi } from "../api/authApi";

export function LoginPage({ auth }: AuthPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const user = await authApi.login({ email, password });
      auth.setUser(user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesion");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-hero">
        <p className="eyebrow">Prode Mundial</p>
        <h1>Entrá y empezá a jugar el torneo partido a partido.</h1>
        <p className="auth-copy">
          Cargá tus predicciones, seguí el ranking en tiempo real y revisá cierres antes de cada kickoff.
        </p>
      </div>

      <form onSubmit={submit} className="auth-card surface-card">
        <div className="auth-tabs">
          <span className="active">Ingresar</span>
          <Link to="/register">Registro</Link>
        </div>

        <label>
          <span>Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>

        <label>
          <span>Contrasena</span>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>

        {error && <p className="error inline-message">{error}</p>}

        <button type="submit" className="button auth-submit">
          Acceder
        </button>

        <p className="muted auth-footnote">
          No tenes cuenta? <Link to="/register">Creala ahora</Link>
        </p>
      </form>
    </section>
  );
}
