import type {
  Match,
  MatchesResponse,
  StandingsResponse,
  TableRow,
  Team,
  TeamsResponse,
  TeamWithCoach,
} from "../types/interfaces";
import { get } from "./client";

export async function getStandings(
  leagueCode: string,
  season: string,
  signal?: AbortSignal,
): Promise<TableRow[]> {
  const data = await get<StandingsResponse>(
    `/competitions/${leagueCode}/standings?season=${season}`,
    signal,
  );
  return data.standings[0]?.table ?? [];
}

export async function getTeams(
  leagueCode: string,
  season: string,
  signal?: AbortSignal,
): Promise<Team[]> {
  const data = await get<TeamsResponse>(
    `/competitions/${leagueCode}/teams?season=${season}`,
    signal,
  );
  return data.teams ?? [];
}

export async function getTeam(
  teamId: number,
  signal?: AbortSignal,
): Promise<TeamWithCoach> {
  return get<TeamWithCoach>(`/teams/${teamId}`, signal);
}

export async function getTeamMatches(
  teamId: number,
  leagueCode: string,
  season: string,
  signal?: AbortSignal,
): Promise<Match[]> {
  const data = await get<MatchesResponse>(
    `/teams/${teamId}/matches?season=${season}&competitions=${leagueCode}`,
    signal,
  );
  return data.matches ?? [];
}
