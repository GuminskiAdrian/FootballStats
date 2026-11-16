import { getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { getSeasonProgress } from "../utils/standingsRankings";
import { formatSeason } from "../utils/formatSeason";
import styles from "./LeagueSummary.module.css";

interface LeagueSummaryProps {
  leagueCode: string;
  season: string;
}

export default function LeagueSummary({
  leagueCode,
  season,
}: LeagueSummaryProps) {
  const { data } = useFetch(`standings:${leagueCode}:${season}`, () =>
    getStandings(leagueCode, season),
  );

  if (!data || data.length === 0) return null;

  const { clubs, total, played } = getSeasonProgress(data);

  return (
    <>
      <p className={styles.meta}>
        <strong>Matchday {played}</strong> of {total} - {clubs} clubs -{" "}
        {formatSeason(season)}
      </p>
      <div className={styles.progress}>
        <div
          className={styles.rail}
          role="img"
          aria-label={`Season progress: matchday ${played} of ${total}`}
          style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
        >
          {Array.from({ length: total }, (_, i) => (
            <i
              key={i}
              className={
                i < played - 1
                  ? styles.on
                  : i === played - 1
                    ? styles.now
                    : undefined
              }
            />
          ))}
        </div>

        <div className={styles.railLabels}>
          <span>MD 1</span>
          <span>MD {total}</span>
        </div>
      </div>
    </>
  );
}
