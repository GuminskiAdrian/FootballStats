import type { Match, MatchTeam } from "../types/interfaces";

export type Outcome = "W" | "D" | "L";

export interface TeamResult {
  matchId: number;
  date: string;
  opponent: MatchTeam;
  isHome: boolean;
  goalsFor: number;
  goalsAgainst: number;
  outcome: Outcome;
}

function toTeamResult(match: Match, teamId: number): TeamResult | null {
  const { home, away } = match.score.fullTime;

  if (match.status !== "FINISHED" || home === null || away === null) {
    return null;
  }

  const isHome = match.homeTeam.id === teamId;
  const goalsFor = isHome ? home : away;
  const goalsAgainst = isHome ? away : home;

  let outcome: Outcome = "D";
  if (goalsFor > goalsAgainst) {
    outcome = "W";
  } else if (goalsFor < goalsAgainst) {
    outcome = "L";
  }

  return {
    matchId: match.id,
    date: match.utcDate,
    opponent: isHome ? match.awayTeam : match.homeTeam,
    isHome,
    goalsFor,
    goalsAgainst,
    outcome,
  };
}

export function getRecentResults(
  matches: Match[],
  teamId: number,
  count: number,
): TeamResult[] {
  return matches
    .map((match) => toTeamResult(match, teamId))
    .filter((result): result is TeamResult => result !== null)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, count);
}
