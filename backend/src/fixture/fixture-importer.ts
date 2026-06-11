import { MatchPhase, MatchStatus, PrismaClient } from "@prisma/client";

export type FixtureMatchInput = {
  id: string;
  phase: string;
  group: string | null;
  homeTeam: string | null;
  awayTeam: string | null;
  homePlaceholder: string | null;
  awayPlaceholder: string | null;
  kickoff: string;
  venue: string;
  stadium: string;
  status: string;
  isPredictionEnabled: boolean;
};

export type FixtureImportSummary = {
  created: number;
  updated: number;
  skipped: number;
};

export function validateFixture(fixture: FixtureMatchInput[]) {
  const ids = new Set<string>();

  for (const match of fixture) {
    if (ids.has(match.id)) {
      throw new Error(`Duplicated fixture id: ${match.id}`);
    }
    ids.add(match.id);

    if (Number.isNaN(new Date(match.kickoff).getTime())) {
      throw new Error(`Invalid kickoff for match ${match.id}`);
    }

    const hasTeams = Boolean(match.homeTeam && match.awayTeam);
    const hasPlaceholders = Boolean(match.homePlaceholder || match.awayPlaceholder);

    if (hasTeams && hasPlaceholders) {
      throw new Error(`Match ${match.id} cannot mix real teams and placeholders`);
    }

    if (!hasTeams && match.isPredictionEnabled) {
      throw new Error(`Match ${match.id} cannot be enabled without confirmed teams`);
    }
  }
}

export async function importFixture(prisma: PrismaClient, fixture: FixtureMatchInput[]): Promise<FixtureImportSummary> {
  validateFixture(fixture);

  const summary = { created: 0, updated: 0, skipped: 0 };

  for (const match of fixture) {
    const existing = await prisma.match.findUnique({ where: { id: match.id } });
    const data = {
      phase: match.phase as MatchPhase,
      group: match.group,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homePlaceholder: match.homePlaceholder,
      awayPlaceholder: match.awayPlaceholder,
      kickoff: new Date(match.kickoff),
      venue: match.venue,
      stadium: match.stadium,
      status: match.status as MatchStatus,
      isPredictionEnabled: match.isPredictionEnabled
    };

    if (!existing) {
      await prisma.match.create({ data: { id: match.id, ...data } });
      summary.created += 1;
      continue;
    }

    if (existing.realHomeScore !== null || existing.realAwayScore !== null) {
      summary.skipped += 1;
      continue;
    }

    await prisma.match.update({ where: { id: match.id }, data });
    summary.updated += 1;
  }

  return summary;
}
