export const API_BASE_URL = "/api";

export interface League {
  code: string;
  name: string;
  theme: string;
}

export const LEAGUES: League[] = [
  { code: "PL", name: "Premier League", theme: "premierLeague" },
  { code: "BL1", name: "Bundesliga", theme: "bundesliga" },
  { code: "SA", name: "Serie A", theme: "serieA" },
  { code: "FL1", name: "Ligue 1", theme: "ligue1" },
  { code: "PD", name: "La Liga", theme: "laLiga" },
];

export const SEASONS: string[] = ["2026", "2025", "2024", "2023"];
export const DEFAULT_SEASON = "2026";
