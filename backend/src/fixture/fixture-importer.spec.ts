import { validateFixture } from "./fixture-importer";

const baseMatch = {
  id: "match-test-001",
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
  isPredictionEnabled: true
};

describe("validateFixture", () => {
  it("accepts a confirmed match enabled for predictions", () => {
    expect(() => validateFixture([baseMatch])).not.toThrow();
  });

  it("rejects duplicated fixture ids", () => {
    expect(() => validateFixture([baseMatch, baseMatch])).toThrow("Duplicated fixture id");
  });

  it("rejects invalid kickoff dates", () => {
    expect(() => validateFixture([{ ...baseMatch, kickoff: "not-a-date" }])).toThrow("Invalid kickoff");
  });

  it("rejects placeholders enabled for predictions", () => {
    expect(() =>
      validateFixture([
        {
          ...baseMatch,
          homeTeam: null,
          awayTeam: null,
          homePlaceholder: "1A",
          awayPlaceholder: "2B",
          isPredictionEnabled: true
        }
      ])
    ).toThrow("cannot be enabled");
  });
});
