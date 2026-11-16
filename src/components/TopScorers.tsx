import { getScorers, getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import styles from "./TeamRankingsTopScorers.module.css";
import ClubShortNames from "./ClubShortNames";

interface TopScorersProps {
  leagueCode: string;
  season: string;
}

function ordinal(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;

  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export default function TopScorers({ leagueCode, season }: TopScorersProps) {
  const { data, loading, error } = useFetch(
    `scorers:${leagueCode}:${season}`,
    () => getScorers(leagueCode, season, 10),
  );

  const standings = useFetch(`standings:${leagueCode}:${season}`, () =>
    getStandings(leagueCode, season),
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

  const [leader, ...rest] = data;
  const leaderClubPosition = standings.data?.find(
    (row) => row.team.id === leader.team.id,
  )?.position;

  return (
    <section aria-labelledby="top-scorers-heading" className={styles.card}>
      <div className={styles.cardHead}>
        <h3 id="top-scorers-heading">Top scorers</h3>
        <small>Goals - assists</small>
      </div>

      <div className={styles.leader}>
        {leader.team.crest !== null ? (
          <img src={leader.team.crest} alt="" />
        ) : (
          <span />
        )}
        <div>
          <p className={styles.leaderName}>{leader.player.name}</p>
          <p className={styles.leaderMeta}>
            <ClubShortNames
              full={leader.team.shortName}
              short={leader.team.tla}
            />
            {leaderClubPosition !== undefined &&
              ` - ${ordinal(leaderClubPosition)}  in table`}
          </p>
        </div>
        <p className={styles.leaderGoals}>
          <strong>{leader.goals}</strong>
          <span>goals</span>
        </p>
      </div>

      <ol className={styles.rank}>
        {rest.map((scorer, index) => (
          <li key={scorer.player.id}>
            <span className={styles.place}>{index + 2}</span>
            {scorer.team.crest !== null ? (
              <img src={scorer.team.crest} alt="" />
            ) : (
              <span />
            )}
            <span className={styles.name}>
              {scorer.player.name}
              <em>
                <abbr title={scorer.team.name}>{scorer.team.tla}</abbr>
              </em>
            </span>
            <span className={styles.goals}>
              {scorer.goals}
              <small>{scorer.assists ?? "-"}</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
