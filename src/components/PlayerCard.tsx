import type { SquadMember } from "../types/interfaces";

interface PlayerCardProps {
  player: SquadMember;
}

const POSITION_LABELS: Record<string, string | undefined> = {
  Goalkeeper: "Goalkeeper",
  Defence: "Defender",
  Midfield: "Midfielder",
  Offence: "Forward",
};

function formatPosition(position: string | null): string {
  if (position === null) {
    return "Unknown position";
  }

  return POSITION_LABELS[position] ?? position;
}

function getAge(dateOfBirth: string | null): number | null {
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
      {" - "}
      {formatPosition(player.position) ?? "Unknown Position"}
      {" - "}
      {player.nationality ?? "Unknown Nationality"}
      {age !== null && ` . ${age} y/o`}
    </li>
  );
}
