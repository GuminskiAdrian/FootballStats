import { getStandings } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

interface LeagueTableProps {
    leagueCode: string;
    season: string;
}

export default function LeagueTable({ leagueCode, season }: LeagueTableProps) {
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

    return (
        <table>
            <caption>Standings, season {season}</caption>
            <thead>
                <tr>
                    <th scope='col'>Position</th>
                    <th scope='col'>Team</th>
                    <th scope='col'><abbr title='Played'>P</abbr></th>
                    <th scope='col'><abbr title='Won'>W</abbr></th>
                    <th scope='col'><abbr title='Drawn'>D</abbr></th>
                    <th scope='col'><abbr title='Lost'>L</abbr></th>
                    <th scope='col'><abbr title='Goals For'>GF</abbr></th>
                    <th scope='col'><abbr title='Goals Against'>GA</abbr></th>
                    <th scope='col'><abbr title='Goal Difference'>GD</abbr></th>
                    <th scope='col'><abbr title='Points'>Pts</abbr></th>
                    <th scope='col'>Form</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.team.id}>
                        <td>{row.position}</td>
                        <td>
                            {row.team.crest !== null && (
                                <img src={row.team.crest} alt={`${row.team.name} crest`} width={20} height={20} />
                            )}{' '}
                            {row.team.shortName}
                        </td>
                        <td>{row.playedGames}</td>
                        <td>{row.won}</td>
                        <td>{row.draw}</td>
                        <td>{row.lost}</td>
                        <td>{row.goalsFor}</td>
                        <td>{row.goalsAgainst}</td>
                        <td>{row.goalDifference}</td>
                        <td>{row.points}</td>
                        <td>{row.form !== null ? row.form.split(',').join(' ') : '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}