import { getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { LEAGUES } from "../config";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import styles from "./LeagueTable.module.css";
import ClubShortNames from "./ClubShortNames";

interface LeagueTableProps {
  leagueCode: string;
  season: string;
  selectedTeamId: number | null;
  onSelectTeam: (teamId: number | null) => void;
}

export default function LeagueTable({
  leagueCode,
  season,
  selectedTeamId,
  onSelectTeam,
}: LeagueTableProps) {
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
    return <p>No standings available.</p>;
  }

  const league = LEAGUES.find((item) => item.code === leagueCode);
  const relegatedFrom = data.length - (league?.relegated ?? 0) + 1;
  const playoffAt = league?.playoff ? relegatedFrom - 1 : null;

  function zoneClass(position: number) {
    if (position >= relegatedFrom) return styles.relegation;
    if (position === playoffAt) return styles.playoff;
    return undefined;
  }

  return (
    <div className={styles.panel}>
      <table className={styles.leagueTable}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">
              <abbr title="Played">P</abbr>
            </th>
            <th scope="col">
              <abbr title="Won">W</abbr>
            </th>
            <th scope="col">
              <abbr title="Drawn">D</abbr>
            </th>
            <th scope="col">
              <abbr title="Lost">L</abbr>
            </th>
            <th scope="col">
              <abbr title="Goals For">GF</abbr>
            </th>
            <th scope="col">
              <abbr title="Goals Against">GA</abbr>
            </th>
            <th scope="col">
              <abbr title="Goal Difference">GD</abbr>
            </th>
            <th scope="col">
              <abbr title="Points">Pts</abbr>
            </th>
            <th scope="col">Form</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.team.id} className={zoneClass(row.position)}>
              <td>{row.position}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    onSelectTeam(
                      row.team.id === selectedTeamId ? null : row.team.id,
                    )
                  }
                  aria-pressed={row.team.id === selectedTeamId}
                >
                  {row.team.crest !== null && (
                    <img src={row.team.crest} alt={`${row.team.name} crest`} />
                  )}{" "}
                  <ClubShortNames
                    full={row.team.shortName}
                    short={row.team.tla}
                  />
                </button>
              </td>
              <td>{row.playedGames}</td>
              <td>{row.won}</td>
              <td>{row.draw}</td>
              <td>{row.lost}</td>
              <td>{row.goalsFor}</td>
              <td>{row.goalsAgainst}</td>
              <td>
                {row.goalDifference > 0
                  ? `+${row.goalDifference}`
                  : row.goalDifference}
              </td>
              <td>{row.points}</td>
              <td className={styles.form}>
                <div className={styles.formItems}>
                  {row.form
                    ? row.form.split(",").map((result, i) => (
                        <span key={i} className={styles[`form-${result}`]}>
                          {result}
                        </span>
                      ))
                    : "-"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.legend}>
        <span>Relegation</span>
        {playoffAt !== null && (
          <span className={styles.legendPlayoff}>Relegation playoff</span>
        )}
      </div>
    </div>
  );
}
