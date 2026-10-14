export const API_BASE_URL = '/api';

export interface League {
    code: string;
    name: string;
}

export const LEAGUES: League[] = [
    { code: 'PL', name: 'Premier League' },
    { code: 'BL1', name: 'Bundesliga' },
    { code: 'SA', name: 'Serie A' },
    { code: 'FL1', name: 'Ligue 1' },
    { code: 'PD', name: 'La Liga' },
];

export const DEFAULT_SEASON = '2026';