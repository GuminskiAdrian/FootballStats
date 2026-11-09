import { getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { getSeasonProgress } from "../utils/standingsRankings";
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
    <div className={styles.test}>
      <p>
        Matchday {played} of {total} - {clubs} clubs
      </p>
      <progress value={played} max={total} aria-label="Season progress" />
    </div>
  );
}
