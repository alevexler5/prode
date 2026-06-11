import { FormEvent, useEffect, useMemo, useState } from "react";
import { groupPredictionsApi, GroupPick } from "../api/groupPredictionsApi";
import { matchesApi } from "../api/matchesApi";
import { Match } from "../types";

export function GroupPredictionsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [groups, setGroups] = useState<GroupPick[]>([]);
  const [bestThirds, setBestThirds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([matchesApi.list(), groupPredictionsApi.mine()])
      .then(([items, saved]) => {
        setMatches(items);
        const groupNames = Array.from(new Set(items.map((match) => match.group).filter(Boolean))) as string[];
        setGroups(
          groupNames.map((group) => {
            const existing = saved.groups.find((item) => item.group === group);
            return {
              group,
              predictedFirstTeam: existing?.predictedFirstTeam ?? "",
              predictedSecondTeam: existing?.predictedSecondTeam ?? ""
            };
          })
        );
        setBestThirds(saved.bestThirds?.predictedTeams ?? []);
        setLoaded(true);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudieron cargar las predicciones"));
  }, []);

  const teamsByGroup = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const match of matches) {
      if (!match.group) continue;
      const teams = map.get(match.group) ?? [];
      for (const team of [match.homeTeam, match.awayTeam]) {
        if (team && !teams.includes(team)) teams.push(team);
      }
      map.set(match.group, teams);
    }
    return map;
  }, [matches]);

  const allTeams = Array.from(new Set(Array.from(teamsByGroup.values()).flat())).sort();
  const completedGroups = groups.filter((group) => group.predictedFirstTeam && group.predictedSecondTeam).length;

  function updateGroup(index: number, patch: Partial<GroupPick>) {
    setGroups((current) => current.map((group, groupIndex) => (groupIndex === index ? { ...group, ...patch } : group)));
  }

  function toggleBestThird(team: string) {
    setBestThirds((current) => {
      if (current.includes(team)) return current.filter((item) => item !== team);
      if (current.length >= 8) return current;
      return [...current, team];
    });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await groupPredictionsApi.save({ groups, bestThirds });
      setMessage("Predicciones de grupos guardadas.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    }
  }

  return (
    <section className="page">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Prediccion de grupos</p>
          <h1>Definí primero, segundo y los 8 mejores terceros de cada grupo.</h1>
          <p className="hero-copy">
            Acá cargás cómo pensás que termina cada grupo. El puntaje suma por posiciones exactas y también por equipos clasificados.
          </p>
        </div>
        <aside className="summary-panel surface-card">
          <h2>Resumen</h2>
          <div className="summary-progress">
            <div>
              <span>Grupos completos</span>
              <strong>{completedGroups}/{groups.length}</strong>
            </div>
            <div>
              <span>Mejores terceros</span>
              <strong>{bestThirds.length}/8</strong>
            </div>
          </div>
          {loaded && <p className="muted">Guardá cuando termines para no perder los cambios.</p>}
        </aside>
      </header>

      <form onSubmit={submit} className="predictions-layout">
        <div className="group-grid">
          {groups.map((group, index) => {
            const teams = teamsByGroup.get(group.group) ?? [];
            const duplicated = Boolean(
              group.predictedFirstTeam &&
              group.predictedSecondTeam &&
              group.predictedFirstTeam === group.predictedSecondTeam
            );

            return (
              <fieldset key={group.group} className="group-card surface-card">
                <legend>Grupo {group.group}</legend>

                <label>
                  <span>Primero</span>
                  <select
                    value={group.predictedFirstTeam}
                    onChange={(event) => updateGroup(index, { predictedFirstTeam: event.target.value })}
                  >
                    <option value="">Elegir equipo</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Segundo</span>
                  <select
                    value={group.predictedSecondTeam}
                    onChange={(event) => updateGroup(index, { predictedSecondTeam: event.target.value })}
                  >
                    <option value="">Elegir equipo</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </label>

                {duplicated && <p className="error inline-message">No podes repetir el mismo equipo en el grupo.</p>}
              </fieldset>
            );
          })}
        </div>

        <section className="thirds-card surface-card">
          <div className="section-title">
            <h2>Mejores terceros</h2>
            <span>{bestThirds.length}/8 seleccionados</span>
          </div>

          <div className="team-pills">
            {allTeams.map((team) => (
              <button
                type="button"
                key={team}
                className={bestThirds.includes(team) ? "selected" : ""}
                onClick={() => toggleBestThird(team)}
              >
                {team}
              </button>
            ))}
          </div>
        </section>

        <div className="sticky-actions">
          <div>
            {message && <p className="success inline-message">{message}</p>}
            {error && <p className="error inline-message">{error}</p>}
          </div>
          <button type="submit" className="button">
            Guardar predicciones
          </button>
        </div>
      </form>
    </section>
  );
}
