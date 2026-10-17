import type { SquadMember, Team } from "../types/interfaces";
import PlayerCard from "./PlayerCard";

interface TeamCardProps {
  team: Team;
  expanded: boolean;
  onToggle: () => void;
}

const POSITION_ORDER: string[] = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
];

function positionRank(position: string | null): number {
  if (position === null) {
    return POSITION_ORDER.length + 1;
  }

  const index = POSITION_ORDER.indexOf(position);
  return index !== -1 ? POSITION_ORDER.length : index;
}

function sortSquad(squad: SquadMember[]): SquadMember[] {
  return [...squad].sort(
    (a, b) =>
      positionRank(a.position) - positionRank(b.position) ||
      a.name.localeCompare(b.name),
  );
}

export default function TeamCard({ team, expanded, onToggle }: TeamCardProps) {
  const squadId = `squad-${team.id}`;

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={squadId}
      >
        {team.crest !== null && (
          <img
            src={team.crest}
            alt={`${team.name} crest`}
            width={32}
            height={32}
          />
        )}{" "}
        {team.shortName}
      </button>

      {expanded && (
        <div id={squadId}>
          <p>Stadium: {team.venue ?? "unknown"}</p>
          {team.squad.length === 0 ? (
            <p>No squad information available.</p>
          ) : (
            <ul>
              {sortSquad(team.squad).map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
