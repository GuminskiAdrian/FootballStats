import Leaguetable from "./components/LeagueTable";
import TeamGrid from "./components/TeamGrid";
import { DEFAULT_SEASON, LEAGUES } from "./config";

export default function App() {
  const league = LEAGUES[0];

  return (
    <main>
      <h1>Football Stats</h1>
      <h2>{league.name}</h2>

      <section>
        <h3>Standings</h3>
        <Leaguetable leagueCode={league.code} season={DEFAULT_SEASON} />
      </section>
      
      <section>
        <h3>Teams</h3>
        <TeamGrid leagueCode={league.code} season={DEFAULT_SEASON} />
      </section>

    </main>
  );
}