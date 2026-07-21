export type CompetitionType =
  | "league"
  | "domestic-cup"
  | "continental-cup"
  | "other";

export type CompetitionStats = {
  id: string;
  name: string;
  type: CompetitionType;
  appearances: number;
  goals: number;
  assists: number;
};

export type Season = {
  year: string;
  club: string;
  league: string;
  clubCrest: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
  trophies: string[];
  awards: string[];
  competitions?: CompetitionStats[];
};
