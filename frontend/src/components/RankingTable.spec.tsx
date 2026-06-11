import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RankingTable } from "./RankingTable";

describe("RankingTable", () => {
  it("renders ranking rows", () => {
    const html = renderToString(
      <RankingTable
        currentUserId="user-1"
        rows={[
          {
            position: 1,
            userId: "user-1",
            name: "Lionel",
            totalPoints: 21,
            predictionPoints: 14,
            groupPoints: 7,
            exactHits: 2,
            outcomeHits: 5,
            loadedPredictions: 8
          }
        ]}
      />
    );

    expect(html).toContain("Lionel");
    expect(html).toContain("21");
  });
});
