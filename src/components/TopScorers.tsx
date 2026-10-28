import { getScorers } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import styles from "./TeamRankingsTopScorers.module.css";
import ClubShortNames from "./ClubShortNames";

interface TopScorersProps {
  leagueCode: string;
  season: string;
}

export default function TopScorers({ leagueCode, season }: TopScorersProps) {
  const { data, loading, error } = useFetch(
    `scorers:${leagueCode}:${season}`,
    () => getScorers(leagueCode, season, 10),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data || data.length === 0) {
    return <p>No scorers available.</p>;
  }

  return (
    <section aria-labelledby="top-scorers-heading" className={styles.stats}>
      <h3 id="top-scorers-heading">Top scorers</h3>
      <ol>
        {data.map((scorer) => (
          <li key={scorer.player.id}>
            <div>
              <span className={styles.player}>{scorer.player.name} </span>
              <span className={styles.teamShort}>
                <ClubShortNames
                  full={scorer.team.shortName}
                  short={scorer.team.tla}
                />
              </span>
            </div>
            <span className={styles.attribute}>{scorer.goals} </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
