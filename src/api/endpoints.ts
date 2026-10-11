import type {
    StandingsResponse,
    TableRow,
    Team,
    TeamsResponse,
} from '../types/interfaces';
import { get } from './client';

export async function getStandings(
    leagueCode: string,
    season: string,
    signal?: AbortSignal,
): Promise<TableRow[]> {
    const data = await get<StandingsResponse>(`/competitions/${leagueCode}/standings?season=${season}`, signal);
    return data.standings[0]?.table ?? [];
}

export async function getTeams(
    leagueCode: string,
    season: string,
    signal?: AbortSignal,
): Promise<Team[]> {
    const data = await get<TeamsResponse>(`/competitions/${leagueCode}/teams?season=${season}`, signal);
    return data.teams ?? [];
}