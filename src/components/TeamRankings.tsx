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

  return (
    <section aria-label="team-rankings-heading" className={styles.teamRankings}>
      <div className={styles.stats}>
        <h3>Most team goals</h3>
        <ol>
          {getBestAttacks(data, 3).map((row) => (
            <li key={row.team.id}>
              <span className={styles.team}>
                <ClubShortNames
                  full={row.team.shortName}
                  short={row.team.tla}
                />{" "}
              </span>
              <span className={styles.attribute}>{row.goalsFor}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.stats}>
        <h3>Fewest goals conceded</h3>
        <ol>
          {getBestDefence(data, 3).map((row) => (
            <li key={row.team.id}>
              <span className={styles.team}>
                <ClubShortNames
                  full={row.team.shortName}
                  short={row.team.tla}
                />{" "}
              </span>
              <span className={styles.attribute}>{row.goalsAgainst}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
