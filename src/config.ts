export const API_BASE_URL = "/api";

export interface League {
  code: string;
  name: string;
  theme: string;
  emblem: string;
  stripe: string[];
  relegated: number;
  playoff: number;
}

const CRESTS = "https://crests.football-data.org";

export const LEAGUES: League[] = [
  {
    code: "PL",
    name: "Premier League",
    theme: "premierLeague",
    emblem: `${CRESTS}/PL.png`,
    stripe: ["#37003c", "#00ff85", "#04f5ff", "#e90052"],
    relegated: 3,
    playoff: 0,
  },
  {
    code: "BL1",
    name: "Bundesliga",
    theme: "bundesliga",
    emblem: `${CRESTS}/BL1.png`,
    stripe: ["#d10214", "#ffffff", "#000000"],
    relegated: 2,
    playoff: 1,
  },
  {
    code: "SA",
    name: "Serie A",
    theme: "serieA",
    emblem: `${CRESTS}/c111.png`,
    stripe: ["#1a1659", "#0032a0", "#0578ff", "#00a346", "#db052b"],
    relegated: 3,
    playoff: 0,
  },
  {
    code: "FL1",
    name: "Ligue 1",
    theme: "ligue1",
    emblem: `${CRESTS}/FL1.png`,
    stripe: ["#091c3e", "#dae91e", "#ffffff"],
    relegated: 2,
    playoff: 1,
  },
  {
    code: "PD",
    name: "La Liga",
    theme: "laLiga",
    emblem: `${CRESTS}/laliga.png`,
    stripe: ["#ff4b44", "#00001b", "#00d4d6", "#eaeaea"],
    relegated: 3,
    playoff: 0,
  },
];

export const SEASONS: string[] = ["2026", "2025", "2024", "2023"];
export const DEFAULT_SEASON = "2026";
