import type { SquadMember } from '../types/interfaces';

interface PlayerCardProps {
    player: SquadMember;
}

function getAge (dateOfBirth: string | null): number | null {
    if (dateOfBirth === null) {
        return null;
    }

    const birth = new Date(dateOfBirth);
    if (Number.isNaN(birth.getTime())) {
        return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birth.getUTCFullYear();
    const hadBirthdayThisYear = 
    today.getMonth() > birth.getUTCMonth() ||
    (today.getMonth() === birth.getUTCMonth() && 
    today.getDate() >= birth.getUTCDate());

    if (!hadBirthdayThisYear) {
        age -= 1;
    }

    return age;
}

export default function PlayerCard({ player }: PlayerCardProps) {
    const age = getAge(player.dateOfBirth);

    return (
        <li>
            <strong>{player.name}</strong>
            {' - '}
            {player.position ?? 'Unknown Position'}
            {' - '}
            {player.nationality ?? 'Unknown Nationality'}
            {age !== null && ` . ${age} y/o`}
        </li>
    );
}