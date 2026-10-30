import { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";
import Leaguetable from "./components/LeagueTable";
import TeamDetails from "./components/TeamDetails";
import { DEFAULT_SEASON, LEAGUES, SEASONS } from "./config";
import { formatSeason } from "./utils/formatSeason";
import TeamRankings from "./components/TeamRankings";
import Topscorers from "./components/TopScorers";

export default function App() {
  const [leagueCode, setLeagueCode] = useState<string>(LEAGUES[0].code);
  const [season, setSeason] = useState<string>(DEFAULT_SEASON);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const league = LEAGUES.find((item) => item.code === leagueCode) ?? LEAGUES[0];

  function handleLeagueChange(newLeagueCode: string) {
    setLeagueCode(newLeagueCode);
    setSelectedTeamId(null);
  }

  function handleSeasonChange(newSeason: string) {
    setSeason(newSeason);
    setSelectedTeamId(null);
  }

  const detailsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isNarrow = window.matchMedia("(max-width: 80rem)").matches;

    if (selectedTeamId !== null && isNarrow) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTeamId]);

  return (
    <main data-league={league.theme}>
      <div className={styles.header}>
        <h1>Football Stats</h1>
        <div className={styles.filters}>
          <div className={styles.filtersLeague}>
            <label htmlFor="league-select">League</label>{" "}
            <select
              id="league-select"
              value={league.code}
              onChange={(event) => handleLeagueChange(event.target.value)}
            >
              {LEAGUES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filtersSeason}>
            <label htmlFor="season-select">Season</label>{" "}
            <select
              id="season-select"
              value={season}
              onChange={(event) => handleSeasonChange(event.target.value)}
            >
              {SEASONS.map((item) => (
                <option key={item} value={item}>
                  {formatSeason(item)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h2 className={styles.leagueName}>{league.name}</h2>

      <div className={styles.layout}>
        <section className={styles.leagueTableSection}>
          <Leaguetable
            key={league.code}
            leagueCode={league.code}
            season={season}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
          />
        </section>

        <aside ref={detailsRef}>
          {selectedTeamId === null ? (
            <div className={styles.statsContainer}>
              <Topscorers leagueCode={league.code} season={season} />
              <TeamRankings leagueCode={league.code} season={season} />
            </div>
          ) : (
            <TeamDetails
              leagueCode={league.code}
              season={season}
              teamId={selectedTeamId}
            />
          )}
        </aside>
      </div>
    </main>
  );
}
