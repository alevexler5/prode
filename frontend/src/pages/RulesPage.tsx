export function RulesPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Reglas</p>
          <h1>Cómo se suman los puntos del prode.</h1>
          <p className="hero-copy">
            Esta guía resume cómo puntúan los resultados de partidos y las posiciones de grupos para que todos jueguen con las mismas reglas.
          </p>
        </div>
      </header>

      <section className="rules-grid">
        <article className="surface-card rule-card">
          <h2>Partidos</h2>
          <div className="rule-list">
            <div>
              <strong>5 puntos</strong>
              <p>Acierto exacto del resultado.</p>
            </div>
            <div>
              <strong>3 puntos</strong>
              <p>Acierto de ganador o empate, sin clavar el marcador.</p>
            </div>
            <div>
              <strong>2 puntos</strong>
              <p>Misma diferencia de gol, aunque no coincida el ganador.</p>
            </div>
            <div>
              <strong>1 punto</strong>
              <p>Acierto de los goles de uno de los dos equipos. Este punto se suma encima de ganador o empate si corresponde.</p>
            </div>
            <div>
              <strong>0 puntos</strong>
              <p>Sin aciertos.</p>
            </div>
          </div>
        </article>

        <article className="surface-card rule-card">
          <h2>Posiciones de grupos</h2>
          <div className="rule-list">
            <div>
              <strong>4 puntos</strong>
              <p>Acierto exacto del primero del grupo.</p>
            </div>
            <div>
              <strong>4 puntos</strong>
              <p>Acierto exacto del segundo del grupo.</p>
            </div>
            <div>
              <strong>2 puntos</strong>
              <p>Equipo dentro del top 2 del grupo, pero en la posición opuesta.</p>
            </div>
            <div>
              <strong>2 puntos</strong>
              <p>Cada mejor tercero clasificado acertado.</p>
            </div>
            <div>
              <strong>2 puntos extra</strong>
              <p>Bonus por clavar primero y segundo exactos en un grupo.</p>
            </div>
          </div>
        </article>

        <article className="surface-card rule-card full-span">
          <h2>Ejemplos rápidos</h2>
          <div className="examples-grid">
            <div>
              <strong>Argentina 2 - 1 Brasil</strong>
              <p>Si pronosticás 2-1, sumás 5 puntos.</p>
              <p>Si pronosticás 1-0, sumás 3 puntos.</p>
              <p>Si pronosticás 3-1, sumás 4 puntos.</p>
            </div>
            <div>
              <strong>Grupo A real: 1 Argentina, 2 México</strong>
              <p>Si pronosticás Argentina / México, sumás 10 puntos.</p>
              <p>Si pronosticás México / Argentina, sumás 4 puntos.</p>
            </div>
            <div>
              <strong>Mejores terceros</strong>
              <p>Si acertás 5 de los 8 clasificados, sumás 10 puntos.</p>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
