import React, { Component } from "react";
import "./App.css";
import ErrorCatcher from "./components/errorCatcher";
import NavBar from "./components/navbar";
import GameList from "./components/gamelist";
import Game from "./components/game";
import TableHeader from "./components/tableHeader";
import TableFooter from "./components/tableFooter";
import PageFooter from "./components/pageFooter";
import ScorePlot from "./components/scorePlot";
import { Table } from "semantic-ui-react";
import ls from "local-storage";
import { stringify } from "csv-stringify/browser/esm/sync";

function emptyState() {
  return {
    players: [
      { playerid: 0, name: "Player 1", playing: true, active: true },
      { playerid: 1, name: "Player 2", playing: true, active: true },
      { playerid: 2, name: "Player 3", playing: true, active: true },
      { playerid: 3, name: "Player 4", playing: true, active: true },
      { playerid: 4, name: "Player 5", playing: false, active: false },
      { playerid: 5, name: "Player 6", playing: false, active: false },
      { playerid: 6, name: "Player 7", playing: false, active: false },
    ],
    playerCount: 4,
    games: [],
    cumulativeScore: [],
    newGame: {
      gameid: 0,
      checkboxes: [
        { playerid: 0, checked: false },
        { playerid: 1, checked: false },
        { playerid: 2, checked: false },
        { playerid: 3, checked: false },
        { playerid: 4, checked: false },
        { playerid: 5, checked: false },
        { playerid: 6, checked: false },
      ],
      points: "",
    },
  };
}

class App extends Component {
  state = {
    players: ls.get("players") || emptyState().players,
    games: ls.get("games") || emptyState().games,
    cumulativeScore: ls.get("cumulativeScore") || emptyState().cumulativeScore,
    newGame: ls.get("newGame") || emptyState().newGame,
    playerCount: ls.get("playerCount") || emptyState().playerCount,
  };
  emptyState = emptyState;

  handlePlayerChange = (newPlayers) => {
    this.setState({ players: newPlayers });
    ls.set("players", newPlayers);
  };

  newGameToGame(newGame) {
    const { players } = this.state;
    const points = Number(newGame.points);
    const winners = newGame.checkboxes.map((checkbox, idx) => {
      return players[idx].active && players[idx].playing
        ? checkbox.checked
        : null;
    });
    const winnerCount = winners.reduce((n, val) => n + (val === true));
    const soloWon = winnerCount === 1;
    const soloLost = winnerCount === 3;


    const score = winners.map(winner => {
      return winner === null ?
        null
        : winner ?
          soloWon ? 3 * points : points
          : soloLost ? -3 * points : -points;
    });

    return {
      gameid: newGame.gameid,
      score,
      points,
      winners,
      soloWon,
      soloLost,
    };
  }

  handleGameAdded = (newGame) => {
    const { games } = this.state;
    const game = this.newGameToGame(newGame);
    games[game.gameid] = game;

    const cumulativeScore = GameList.prototype.cumsum2d(
      games.map((game) => game.score),
    );
    this.setState({ cumulativeScore: cumulativeScore });
    ls.set("cumulativeScore", cumulativeScore);

    this.setState({ games: games });
    ls.set("games", games);

    this.resetNewGame(games.length);
  };

  handleNewGameChange = (newNewGame) => {
    const { newGame } = this.state;
    if (newNewGame.checkboxes !== undefined) {
      newGame.checkboxes = newNewGame.checkboxes;
    }
    if (newNewGame.points !== undefined) {
      newGame.points = newNewGame.points;
    }
    this.setState({ newGame: newGame });
    ls.set("newGame", newGame);
  };

  resetNewGame = (newIDX) => {
    const { playerCount } = this.state;
    const emptyNewGame = this.emptyState()["newGame"];
    emptyNewGame.gameid = newIDX;
    this.setPlaying(playerCount, emptyNewGame.gameid);
    this.setState({ newGame: emptyNewGame });
    ls.set("newGame", emptyNewGame);
  };

  setPlaying = (playerCount, gameid) => {
    const { players } = this.state;
    const playing = Array(playerCount).fill(true);

    const sittingOutCount = playerCount - 4;
    const sittingOutStart = gameid % playerCount;

    for (
      let playeridx = sittingOutStart;
      playeridx < sittingOutStart + sittingOutCount;
      playeridx++
    ) {
      playing[playeridx % playerCount] = false;
    }
    players.forEach((player, idx) => {
      player.playing = playing[idx];
    });
  };

  handleReset = () => {
    const emptyState = this.emptyState();
    this.setState(emptyState);
    ls.set("players", emptyState.players);
    ls.set("playerCount", emptyState.playerCount);
    ls.set("games", emptyState.games);
    ls.set("newGame", emptyState.newGame);
    ls.set("cumulativeScore", emptyState.cumulativeScore);
  };

  handleGameChange = (idx) => {
    const { games, playerCount } = this.state;
    const game = games[idx];
    const { newGame } = this.emptyState();
    newGame.checkboxes.forEach((checkbox, idx) => {
      checkbox.checked = game.winners[idx];
    });

    newGame.points = game.points;
    newGame.gameid = game.gameid;
    this.setPlaying(playerCount, newGame.gameid);
    this.setState({ newGame: newGame });
  };

  addNewPlayer = () => {
    let { games, players, playerCount } = this.state;
    if (playerCount < 7) {
      players[playerCount].active = true;
      playerCount++;
      this.setPlaying(playerCount, games.length);
      this.setState({ playerCount: playerCount });
      this.setState({ players: players });
      ls.set("players", players);
      ls.set("playerCount", playerCount);
      ls.set("playerCount", playerCount);
    }
  };

  removePlayer = () => {
    let { players, playerCount, games } = this.state;
    if (playerCount > 4) {
      playerCount--;
      const gameToChange =
        games.length === 0 ? games.length : games[games.length - 1].gameid;
      this.setPlaying(playerCount, gameToChange);
      players[playerCount].active = false;
      this.setState({ players: players });
      this.setState({ playerCount: playerCount });
      ls.set("players", players);
      ls.set("playerCount", playerCount);
    }
  };

  downloadStringAsFile(content, filename) {
    const file = new Blob([content], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  downloadCSV = () => {
    let { players, playerCount, cumulativeScore, games } = this.state;
    const headerRow = ["#"];
    for (let idx = 0; idx < playerCount; idx++) {
      headerRow.push(players[idx].name);
    }
    headerRow.push("game");
    const csvTable = [headerRow];
    csvTable.push(new Array(1 + playerCount).fill(0));
    cumulativeScore.forEach((cumScoreRow, idx) => {
      const game = games[idx];
      let row = [game.gameid + 1];
      row = row.concat(cumScoreRow.slice(0, playerCount));
      row.push(
        Game.prototype.displayPoints(
          game.points,
          game.soloWon || game.soloLost,
        ),
      );
      csvTable.push(row);
    });
    const curDate = new Date();
    this.downloadStringAsFile(
      stringify(csvTable),
      `doko_game_${curDate.toISOString()}.csv`,
    );
  };

  render() {
    let { players, games, newGame, playerCount, cumulativeScore } = this.state;
    return (
      <React.Fragment>
        <NavBar
          onReset={this.handleReset}
          onPlayerAdd={this.addNewPlayer}
          onPlayerDelete={this.removePlayer}
          onDownloadCSV={this.downloadCSV}
        />
        <ErrorCatcher>
          <Table
            fixed
            selectable
            unstackable
            columns={5}
            striped
            textAlign="center"
            size="small"
            style={{ borderCollapse: "collapse" }}
          >
            <TableHeader players={players} onChange={this.handlePlayerChange} />
            <GameList
              cumulativeScore={cumulativeScore}
              games={games}
              playerCount={playerCount}
              onChange={this.handleGameChange}
            />
            <TableFooter
              players={players}
              newGame={newGame}
              onChange={this.handleNewGameChange}
              onSubmit={this.handleGameAdded}
            />
          </Table>
        </ErrorCatcher>
        <ScorePlot players={players} games={games} playerCount={playerCount} />
        <PageFooter />
      </React.Fragment>
    );
  }
}

export default App;
