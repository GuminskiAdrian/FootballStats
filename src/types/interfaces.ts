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
  crest: string | null;
  address: string | null;
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

export interface Standing {
  table: TableRow[];
}

export interface StandingsResponse {
  standings: Standing[];
}

export interface Coach {
  id: number | null;
  name: string | null;
  nationality: string | null;
  dateOfBirth: string | null;
}

export interface TeamWithCoach extends Team {
  coach: Coach | null;
}

export interface MatchTeam {
  id: number;
  name: string | null;
  shortName: string | null;
  tla: string | null;
  crest: string | null;
}

export interface MatchScore {
  winner: string | null;
  fullTime: {
    home: number | null;
    away: number | null;
  };
}

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  score: MatchScore;
}

export interface MatchesResponse {
  matches: Match[];
}

export interface ScorerPlayer {
  id: number;
  name: string;
  nationality: string | null;
  section: string | null;
  position: string | null;
}

export interface ScorerTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string | null;
}

export interface Scorer {
  player: ScorerPlayer;
  team: ScorerTeam;
  playedMatches: number;
  goals: number;
  assists: number | null;
  penalties: number | null;
}

export interface ScorersResponse {
  scorers: Scorer[];
}
