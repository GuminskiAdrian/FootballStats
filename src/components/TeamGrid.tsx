import { useState } from 'react';
import { getTeams } from '../api/endpoints';
import {useFetch} from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import TeamCard from './TeamCard';

interface TeamGridProps {
    leagueCode: string;
    season: string;
}

export default function TeamGrid({ leagueCode, season}: TeamGridProps) {
    const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);
    const { data, loading, error } = useFetch(
        `teams:${leagueCode}:${season}`,
        () => getTeams(leagueCode, season),
    );

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (!data || data.length === 0) {
        return <p>No Teams Found.</p>;
    }

    return (
        <ul>
            {data.map((team) => (
                <TeamCard
                    key={team.id}
                    team={team}
                    expanded={expandedTeamId === team.id}
                    onToggle={() => 
                        setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                />
            ))}
        </ul>
    )
}