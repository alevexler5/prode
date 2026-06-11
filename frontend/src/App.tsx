import { ReactElement, useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "./api/authApi";
import { getToken } from "./api/client";
import { AdminPage } from "./pages/AdminPage";
import { FixturePage } from "./pages/FixturePage";
import { GroupPredictionsPage } from "./pages/GroupPredictionsPage";
import { LoginPage } from "./pages/LoginPage";
import { RankingPage } from "./pages/RankingPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResultsPage } from "./pages/ResultsPage";
import { RulesPage } from "./pages/RulesPage";
import { User } from "./types";

export type AuthContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

function PrivateRoute({ user, children }: { user: User | null; children: ReactElement }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(Boolean(getToken()));
  const [flash, setFlash] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = { user, setUser };
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (!getToken()) return;

    authApi
      .me()
      .then(setUser)
      .catch(() => authApi.logout())
      .finally(() => setLoadingSession(false));
  }, []);

  function logout() {
    authApi.logout();
    setUser(null);
    setFlash("Sesion cerrada.");
    navigate("/login");
  }

  useEffect(() => {
    function onUnauthorized() {
      authApi.logout();
      setUser(null);
      setFlash("Tu sesion vencio. Volve a ingresar.");
      navigate("/login");
    }

    window.addEventListener("prode:unauthorized", onUnauthorized);
    return () => window.removeEventListener("prode:unauthorized", onUnauthorized);
  }, [navigate]);

  if (loadingSession) {
    return (
      <div className="app-shell app-shell-loading">
        <div className="loading-state">
          <p className="eyebrow">Prode Mundial</p>
          <strong>Cargando sesion...</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {!isAuthPage && (
        <header className="topbar">
          <div className="topbar-inner">
            <Link to="/" className="brand-block">
              <span className="brand-title">Prode Mundial</span>
              <span className="brand-subtitle">Predicciones, resultados y ranking del torneo</span>
            </Link>

            <nav className="nav-links">
              <NavLink to="/">Fixture</NavLink>
              <NavLink to="/groups">Prediccion de grupos</NavLink>
              <NavLink to="/ranking">Ranking</NavLink>
              <NavLink to="/results">Resultados</NavLink>
              <NavLink to="/rules">Reglas</NavLink>
              {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
            </nav>

            <div className="session-panel">
              {user ? (
                <>
                  <div className="session-meta">
                    <span className="session-name">{user.name}</span>
                    <span className="session-points">{user.totalPoints} pts</span>
                  </div>
                  <button type="button" className="button button-secondary" onClick={logout}>
                    Salir
                  </button>
                </>
              ) : (
                <Link to="/login" className="button button-secondary">
                  Ingresar
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      <main className={isAuthPage ? "app-main auth-main" : "app-main"}>
        {flash && <p className="success banner">{flash}</p>}
        <Routes>
          <Route path="/login" element={<LoginPage auth={auth} />} />
          <Route path="/register" element={<RegisterPage auth={auth} />} />
          <Route path="/" element={<PrivateRoute user={user}><FixturePage /></PrivateRoute>} />
          <Route path="/groups" element={<PrivateRoute user={user}><GroupPredictionsPage /></PrivateRoute>} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/admin" element={<PrivateRoute user={user}><AdminPage user={user} /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export type AuthPageProps = {
  auth: AuthContextValue;
};
