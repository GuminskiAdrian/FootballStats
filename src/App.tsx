import { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";
import Leaguetable from "./components/LeagueTable";
import TeamDetails from "./components/TeamDetails";
import { DEFAULT_SEASON, LEAGUES, SEASONS } from "./config";
import { formatSeason } from "./utils/formatSeason";
import TeamRankings from "./components/TeamRankings";
import Topscorers from "./components/TopScorers";
import LeagueSummary from "./components/LeagueSummary";

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
      <div className={styles.band}>
        <div className={styles.stripe} aria-hidden="true">
          {league.stripe.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>

        <div className={styles.bandInner}>
          <header className={styles.header}>
            <p className={styles.brand}>Football Stats</p>

            <nav className={styles.leagues} aria-label="League">
              {LEAGUES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  aria-current={item.code === league.code ? "true" : undefined}
                  onClick={() => handleLeagueChange(item.code)}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <label className={styles.season}>
              <span>Season</span>
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
            </label>
          </header>

          <div className={styles.title}>
            <div className={styles.emblem}>
              <img src={league.emblem} alt="" />
            </div>
            <h1>{league.name}</h1>
            <LeagueSummary leagueCode={leagueCode} season={season} />
          </div>
        </div>
      </div>
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
