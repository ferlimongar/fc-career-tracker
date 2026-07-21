import type { Season } from "@/types/season";

export function calculateCareerStats(seasons: Season[]) {
  return {
    matches: seasons.reduce(
      (total, season) => total + season.matches,
      0
    ),

    goals: seasons.reduce(
      (total, season) => total + season.goals,
      0
    ),

    assists: seasons.reduce(
      (total, season) => total + season.assists,
      0
    ),

    rating:
      seasons.length > 0
        ? (
            seasons.reduce(
              (total, season) => total + season.rating,
              0
            ) / seasons.length
          ).toFixed(2)
        : 0,
  };
}
