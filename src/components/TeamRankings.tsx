import { getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { getBestAttacks, getBestDefence } from "../utils/standingsRankings";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import styles from "./TeamRankingsTopScorers.module.css";
import ClubShortNames from "./ClubShortNames";

interface TeamRankingsProps {
  leagueCode: string;
  season: string;
}

export default function TeamRankings({
  leagueCode,
  season,
}: TeamRankingsProps) {
  const { data, loading, error } = useFetch(
    `standings:${leagueCode}:${season}`,
    () => getStandings(leagueCode, season),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const attack = getBestAttacks(data, 3);
  const defence = getBestDefence(data, 3);

  const maxGoals = Math.max(1, ...attack.map((row) => row.goalsFor));
  const leastConceded = Math.max(
    1,
    Math.min(...defence.map((row) => row.goalsAgainst)),
  );

  return (
    <section aria-label="team rankings" className={styles.teamRankings}>
      <div className={styles.stats}>
        <h3>Most team goals</h3>
        <ol>
          {attack.map((row) => (
            <li key={row.team.id}>
              <span className={styles.team}>
                <ClubShortNames
                  full={row.team.shortName}
                  short={row.team.tla}
                />{" "}
              </span>
              <span className={styles.attribute}>{row.goalsFor}</span>
              <progress
                value={row.goalsFor / maxGoals}
                aria-label="Goals scored realtive to the bst attack"
              />
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.stats}>
        <h3>Fewest goals conceded</h3>
        <ol>
          {defence.map((row) => (
            <li key={row.team.id}>
              <span className={styles.team}>
                <ClubShortNames
                  full={row.team.shortName}
                  short={row.team.tla}
                />{" "}
              </span>
              <span className={styles.attribute}>{row.goalsAgainst}</span>
              <progress
                value={leastConceded / Math.max(1, row.goalsAgainst)}
                aria-label="Goals conceded realtive to the best defence"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
