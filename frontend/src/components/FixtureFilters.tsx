type Props = {
  phase: string;
  group: string;
  team: string;
  onChange: (filters: { phase: string; group: string; team: string }) => void;
};

export function FixtureFilters({ phase, group, team, onChange }: Props) {
  return (
    <section className="filter-panel surface-card">
      <div className="field-grid">
        <label>
          <span>Fase</span>
          <select value={phase} onChange={(event) => onChange({ phase: event.target.value, group, team })}>
            <option value="">Todas las fases</option>
            <option value="groups">Grupos</option>
            <option value="round_of_32">Dieciseisavos</option>
            <option value="round_of_16">Octavos</option>
            <option value="quarterfinal">Cuartos</option>
            <option value="semifinal">Semifinal</option>
            <option value="final">Final</option>
          </select>
        </label>

        <label>
          <span>Grupo</span>
          <input
            value={group}
            onChange={(event) => onChange({ phase, group: event.target.value, team })}
            placeholder="A, B, C..."
          />
        </label>

        <label>
          <span>Equipo</span>
          <input
            value={team}
            onChange={(event) => onChange({ phase, group, team: event.target.value })}
            placeholder="Buscar seleccion"
          />
        </label>
      </div>
    </section>
  );
}
