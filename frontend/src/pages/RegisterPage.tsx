import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthPageProps } from "../App";
import { authApi } from "../api/authApi";

export function RegisterPage({ auth }: AuthPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const user = await authApi.register({ name, email, password });
      auth.setUser(user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar el usuario");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-hero">
        <p className="eyebrow">Nueva cuenta</p>
        <h1>Sumate al prode y dejá tus picks antes del cierre.</h1>
        <p className="auth-copy">
          Vas a poder completar resultados, clasificados de grupos y seguir tu progreso frente al resto.
        </p>
      </div>

      <form onSubmit={submit} className="auth-card surface-card">
        <div className="auth-tabs">
          <Link to="/login">Ingresar</Link>
          <span className="active">Registro</span>
        </div>

        <label>
          <span>Nombre</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>

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
          Crear cuenta
        </button>

        <p className="muted auth-footnote">
          Ya tenes cuenta? <Link to="/login">Ingresá</Link>
        </p>
      </form>
    </section>
  );
}
