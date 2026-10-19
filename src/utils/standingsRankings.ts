import type { TableRow } from "../types/interfaces";

export function getBestAttacks(table: TableRow[], count: number): TableRow[] {
  return [...table]
    .sort(
      (a, b) => b.goalsFor - a.goalsFor || b.goalDifference - a.goalDifference,
    )
    .slice(0, count);
}

export function getBestDefence(table: TableRow[], count: number): TableRow[] {
  return [...table]
    .sort(
      (a, b) =>
        a.goalsAgainst - b.goalsAgainst || b.goalDifference - a.goalDifference,
    )
    .slice(0, count);
}
