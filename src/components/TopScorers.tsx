import { getScorers } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

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
    <section aria-labelledby="top-scorers-heading">
      <h3 id="top-scorers-heading">Top scorers</h3>
      <ol>
        {data.map((scorer) => (
          <li key={scorer.player.id}>
            {scorer.player.name} ({scorer.team.shortName}) - {scorer.goals}{" "}
            goals
            {scorer.assists !== null && `, ${scorer.assists} assists`}
          </li>
        ))}
      </ol>
    </section>
  );
}
