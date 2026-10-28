import type { SquadMember } from "../types/interfaces";
import styles from "./PlayerCard.module.css";
import ClubShortNames from "./ClubShortNames";

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

const POSITION_SHORT_LABELS: Record<string, string | undefined> = {
  Goalkeeper: "GK",
  Defence: "DEF",
  Midfield: "MID",
  Offence: "FWD",
};

function formatPositionShort(position: string | null): string {
  if (position === null) {
    return "N/A";
  }

  return POSITION_SHORT_LABELS[position] ?? position;
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
    <li className={styles.player}>
      <span className={styles.position}>
        <ClubShortNames
          full={formatPosition(player.position)}
          short={formatPositionShort(player.position)}
        />
      </span>
      <span className={styles.name}>
        <strong>{player.name}</strong>
      </span>
      <span className={styles.nationality}>
        {player.nationality ?? "Unknown Nationality"}
      </span>
      <span className={styles.age}>{age !== null && `${age} y/o`}</span>
    </li>
  );
}
