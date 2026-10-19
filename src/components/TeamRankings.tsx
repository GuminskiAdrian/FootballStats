import { getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { getBestAttacks, getBestDefence } from "../utils/standingsRankings";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

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
    <section aria-labelledby="team-rankings-heading">
      <h3 id="team-rankings-heading">Team rankings</h3>

      <h4>Best attack</h4>
      <ol>
        {getBestAttacks(data, 3).map((row) => (
          <li key={row.team.id}>
            {row.team.shortName} ({row.goalsFor} goals scored)
          </li>
        ))}
      </ol>

      <h4>Best defence</h4>
      <ol>
        {getBestDefence(data, 3).map((row) => (
          <li key={row.team.id}>
            {row.team.shortName} ({row.goalsAgainst} goals conceded)
          </li>
        ))}
      </ol>
    </section>
  );
}
