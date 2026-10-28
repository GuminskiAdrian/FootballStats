import { getTeams } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import type { SquadMember } from "../types/interfaces";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import PlayerCard from "./PlayerCard";
import RecentResults from "./RecentResults";
import TeamCoach from "./TeamCoach";
import styles from "./TeamDetails.module.css";

interface TeamDetailsProps {
  leagueCode: string;
  season: string;
  teamId: number;
}

const POSITION_ORDER: string[] = [
  "Goalkeeper",
  "Defence",
  "Midfield",
  "Offence",
];

function positionRank(position: string | null): number {
  if (position === null) {
    return POSITION_ORDER.length + 1;
  }

  const index = POSITION_ORDER.indexOf(position);
  return index === -1 ? POSITION_ORDER.length : index;
}

function sortSquad(squad: SquadMember[]): SquadMember[] {
  return [...squad].sort(
    (a, b) =>
      positionRank(a.position) - positionRank(b.position) ||
      a.name.localeCompare(b.name),
  );
}

export default function TeamDetails({
  leagueCode,
  season,
  teamId,
}: TeamDetailsProps) {
  const { data, loading, error } = useFetch(
    `teams:${leagueCode}:${season}`,
    () => getTeams(leagueCode, season),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const team = data?.find((item) => item.id === teamId);

  if (!team) {
    return <p>Team details not available.</p>;
  }

  return (
    <section
      aria-labelledby="team-details-heading"
      className={styles.teamDetails}
    >
      <div className={styles.info}>
        {team.crest !== null && (
          <img src={team.crest} alt={`${team.name} badge`} />
        )}
        <h3 id="team-details-heading">{team.name}</h3>
        <div className={styles.stadiumAndCoach}>
          <p>Stadium: {team.venue ?? "unknown"}</p>
          <TeamCoach teamId={team.id} />
        </div>
      </div>
      <RecentResults teamId={team.id} leagueCode={leagueCode} season={season} />
      <div className={styles.squad}>
        <h4>Squad</h4>
        {team.squad.length === 0 ? (
          <p>No squad data available.</p>
        ) : (
          <ul>
            {sortSquad(team.squad).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
