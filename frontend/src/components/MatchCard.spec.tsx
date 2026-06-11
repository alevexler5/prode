import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MatchCard } from "./MatchCard";

describe("MatchCard", () => {
  it("renders a confirmed match", () => {
    const html = renderToString(
      <MatchCard
        match={{
          id: "match-001",
          phase: "groups",
          group: "A",
          homeTeam: "Argentina",
          awayTeam: "Mexico",
          homePlaceholder: null,
          awayPlaceholder: null,
          kickoff: "2026-06-11T19:00:00.000Z",
          venue: "Ciudad de Mexico",
          stadium: "Estadio Azteca",
          status: "scheduled",
          isPredictionEnabled: true,
          realHomeScore: null,
          realAwayScore: null
        }}
        readonly
      />
    );

    expect(html).toContain("Argentina");
    expect(html).toContain("Mexico");
  });
});
