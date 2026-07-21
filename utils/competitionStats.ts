import type { CompetitionStats, Season } from "@/types/season";

export type CareerCompetitionStats = Pick<
  CompetitionStats,
  "name" | "appearances" | "goals" | "assists"
>;

export function groupCompetitionStats(
  seasons: Season[],
): CareerCompetitionStats[] {
  const grouped = new Map<string, CareerCompetitionStats>();

  seasons.forEach((season) => {
    (season.competitions ?? []).forEach((competition) => {
      const name = competition.name.trim();

      if (!name) return;

      const existing = grouped.get(name);

      if (existing) {
        existing.appearances += competition.appearances;
        existing.goals += competition.goals;
        existing.assists += competition.assists;
        return;
      }

      grouped.set(name, {
        name,
        appearances: competition.appearances,
        goals: competition.goals,
        assists: competition.assists,
      });
    });
  });

  return Array.from(grouped.values());
}

export function groupLeagueGoals(seasons: Season[]) {
  const grouped = new Map<string, number>();

  seasons.forEach((season) => {
    (season.competitions ?? []).forEach((competition) => {
      const name = competition.name.trim();

      if (competition.type !== "league" || !name) return;

      grouped.set(name, (grouped.get(name) ?? 0) + competition.goals);
    });
  });

  return Array.from(grouped, ([name, goals]) => ({ name, goals }));
}
