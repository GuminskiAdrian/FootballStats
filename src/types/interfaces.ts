export interface SquadMember {
  id: number;
  name: string;
  position: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string | null;
  founded: number | null;
  clubColors: string | null;
  venue: string | null;
  squad: SquadMember[];
}

export interface TeamsResponse {
    teams: Team[];
}

export interface StandingTeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string | null;
}

export interface TableRow {
    position: number;
    team: StandingTeam;
    playedGames: number;
    form: string | null;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export interface Standign {
    table: TableRow[];
}

export interface StandingsResponse {
    standings: Standign[];
}