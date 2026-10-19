import { getTeam } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

interface TeamCoachProps {
  teamId: number;
}

export default function TeamCoach({ teamId }: TeamCoachProps) {
  const { data, loading, error } = useFetch(`team:${teamId}`, () =>
    getTeam(teamId),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <p>Current coach: {data?.coach?.name ?? "unknown"}</p>;
}
