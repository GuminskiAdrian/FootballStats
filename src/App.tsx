import { useState } from "react";
import "./App.css";
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

  return (
    <main>
      <h1>Football Stats</h1>
      <div className="filters">
        <div>
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
        <div>
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

      <h2>
        {league.name}, {formatSeason(season)}
      </h2>

      <div className="layout">
        <section>
          <h3>Standings</h3>
          <Leaguetable
            key={league.code}
            leagueCode={league.code}
            season={season}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
          />
        </section>

        <aside>
          {selectedTeamId === null ? (
            <>
              <Topscorers leagueCode={league.code} season={season} />
              <TeamRankings leagueCode={league.code} season={season} />
            </>
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
