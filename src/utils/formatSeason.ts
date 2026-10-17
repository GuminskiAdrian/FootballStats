export function formatSeason(startYear: string): string {
  const nextYear = String(Number(startYear) + 1).slice(2);
  return `${startYear}/${nextYear}`;
}
