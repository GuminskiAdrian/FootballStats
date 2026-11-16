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
    <section aria-label="Team rankings" className={styles.pair}>
      <div className={`${styles.card} ${styles.attack}`}>
        <div className={styles.cardHead}>
          <h3>Most goals scored</h3>
        </div>
        <ol className={styles.bars}>
          {attack.map((row) => (
            <li key={row.team.id}>
              <span className={styles.barName}>
                {row.team.crest !== null && <img src={row.team.crest} alt="" />}
                <ClubShortNames
                  full={row.team.shortName}
                  short={row.team.tla}
                />
              </span>
              <span className={styles.barValue}>{row.goalsFor}</span>
              <span className={styles.track}>
                <span
                  className={styles.fill}
                  style={{ width: `${(row.goalsFor / maxGoals) * 100}%` }}
                />
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={`${styles.card} ${styles.defence}`}>
        <div className={styles.cardHead}>
          <h3>Fewest conceded</h3>
        </div>
        <ol className={styles.bars}>
          {defence.map((row) => (
            <li key={row.team.id}>
              <span className={styles.barName}>
                {row.team.crest !== null && <img src={row.team.crest} alt="" />}
                <ClubShortNames
                  full={row.team.shortName}
                  short={row.team.tla}
                />
              </span>
              <span className={styles.barValue}>{row.goalsAgainst}</span>
              <span className={styles.track}>
                <span
                  className={styles.fill}
                  style={{
                    width: `${(leastConceded / Math.max(1, row.goalsAgainst)) * 100}%`,
                  }}
                />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
