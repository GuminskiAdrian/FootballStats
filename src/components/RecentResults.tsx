import { getTeamMatches } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { getRecentResults } from "../utils/matchResult";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

interface RecentResultsProps {
  teamId: number;
  leagueCode: string;
  season: string;
}

export default function RecentResults({
  teamId,
  leagueCode,
  season,
}: RecentResultsProps) {
  const { data, loading, error } = useFetch(
    `matches:${teamId}:${leagueCode}:${season}`,
    () => getTeamMatches(teamId, leagueCode, season),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const results = getRecentResults(data ?? [], teamId, 5);

  if (results.length === 0) {
    return <p>No finished matches.</p>;
  }

  return (
    <section aria-labelledby="recent-results-heading">
      <h4 id="recent-results-heading">Recent results</h4>
      <ul>
        {results.map((result) => (
          <li key={result.matchId}>
            {new Date(result.date).toLocaleDateString("en-GB")}
            {" · "}
            {result.isHome ? "H" : "A"}
            {" · "}
            {result.opponent.shortName ?? result.opponent.name ?? "Unknown"}
            {" · "}
            {result.goalsFor}:{result.goalsAgainst}
            {" · "}
            {result.outcome}
          </li>
        ))}
      </ul>
    </section>
  );
}
