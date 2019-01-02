import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import GameList from './components/gamelist';
import TableHeader from './components/tableHeader';
import TableFooter from './components/tableFooter';
import PageFooter from './components/pageFooter';
import { Table } from 'semantic-ui-react'
import ls from 'local-storage'

function emptyState() {
  return {
    players: [
      {playerid: 0, name: "Player 1", playing: true, active:true},
      {playerid: 1, name: "Player 2", playing: true, active:true},
      {playerid: 2, name: "Player 3", playing: true, active:true},
      {playerid: 3, name: "Player 4", playing: true, active:true},
      {playerid: 4, name: "Player 5", playing: false, active:false},
      {playerid: 5, name: "Player 6", playing: false, active:false},
      {playerid: 6, name: "Player 7", playing: false, active:false},
      {playerid: 7, name: "Player 8", playing: false, active:false}
    ],
    playerCount: 4,
    games: [],
    newGame: {
      gameid: 0,
      checkboxes: [
        {playerid: 0, checked: false},
        {playerid: 1, checked: false},
        {playerid: 2, checked: false},
        {playerid: 3, checked: false},
        {playerid: 4, checked: false},
        {playerid: 5, checked: false},
        {playerid: 6, checked: false},
        {playerid: 7, checked: false},
      ],
      points: ''
    }
  }
};

class App extends Component {
  state = {
    players: ls.get('players') || emptyState().players,
    games: ls.get('games') || emptyState().games,
    newGame: ls.get('newGame') || emptyState().newGame,
    playerCount: ls.get('playerCount') || emptyState().playerCount,
  }
  emptyState = emptyState;

  handlePlayerChange = (newPlayers) => {
    this.setState({players:newPlayers})
    ls.set('players', newPlayers);
  }

  newGameToGame(newGame) {
    const { players } = this.state;
    const points = Number(newGame.points);
    const winners = newGame.checkboxes.map((checkbox, idx) => {
      return players[idx].active && players[idx].playing ? checkbox.checked : null
    })
    const winnerCount = winners.reduce((n, val) => n + (val === true));
    const soloWon = winnerCount === 1;
    const soloLost = winnerCount === 3;


    const score = winners.map(winner => {
      return winner === null ? 
        null
        : winner ? 
          soloWon ? 3 * points : points
          : soloLost ? -3 * points : -points
    })

    return {
      gameid: newGame.gameid,
      score,
      points,
      winners,
      soloWon,
      soloLost
    };
  }

  handleGameAdded = (newGame) => {
    const { games } = this.state;
    const game = this.newGameToGame(newGame);
    games[game.gameid] = game;
  
    this.setState({games:games})
    ls.set('games', games);

    this.resetNewGame(games.length);
  }

  handleNewGameChange = (newNewGame) => {
    const { newGame } = this.state;
    if (newNewGame.checkboxes !== undefined) {
      newGame.checkboxes = newNewGame.checkboxes;
    } 
    if (newNewGame.points !== undefined) {
      newGame.points = newNewGame.points;
    }
    this.setState({newGame:newGame})
    ls.set('newGame', newGame);
  }

  resetNewGame = (newIDX) => {
    const { playerCount } = this.state;
    const emptyNewGame  = this.emptyState()['newGame'];
    emptyNewGame.gameid = newIDX;
    this.setPlaying(playerCount, emptyNewGame.gameid);
    this.setState({newGame:emptyNewGame})
    ls.set('newGame', emptyNewGame);
  }

  setPlaying = (playerCount, gameid) => {
    const { players } = this.state;
    const playing = Array(playerCount).fill(true);

    const sittingOutCount = playerCount - 4;
    const sittingOutStart = gameid % playerCount;

    for (let playeridx = sittingOutStart; playeridx < sittingOutStart+sittingOutCount; playeridx++) {
      playing[playeridx%playerCount] = false;
    }
    players.forEach((player, idx) => {
      player.playing = playing[idx];
    });
  }

  handleReset = () => {
    const emptyState = this.emptyState();
    this.setState(emptyState);
    ls.set('players', emptyState.players);
    ls.set('playerCount', emptyState.playerCount);
    ls.set('games', emptyState.games);
    ls.set('newGame', emptyState.newGame);
  }

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
    this.setState({newGame:newGame});
  }

  addNewPlayer = () => {
    let { games, players, playerCount } = this.state;
    if (playerCount < 8) {
      players[playerCount].active = true;
      playerCount++
      this.setPlaying(playerCount, games.length);
      this.setState({playerCount: playerCount})
      this.setState({players: players})
      ls.set('players', players);
      ls.set('playerCount', playerCount);
      ls.set('playerCount', playerCount);
    }
  }

  removePlayer = () => {
    let { players, playerCount, games } = this.state;
    if (playerCount > 4) {
      playerCount--;
      this.setPlaying(playerCount, games[games.length-1].gameid);
      players[playerCount].active = false;
      this.setState({players: players})
      this.setState({playerCount: playerCount})
      ls.set('players', players);
      ls.set('playerCount', playerCount);
    }
  }

  render() {
    const { players, games, newGame, playerCount } = this.state

    return (
      <React.Fragment>
        <NavBar onReset={this.handleReset} onPlayerAdd={this.addNewPlayer} onPlayerDelete={this.removePlayer}/>
        <Table fixed selectable unstackable columns={5} striped textAlign='center' size='small' style={{borderCollapse: "collapse"}}>
          <TableHeader players={players} onChange={this.handlePlayerChange}/>
          <GameList games={games} playerCount={playerCount} onChange={this.handleGameChange}/>
          <TableFooter players={players} newGame={newGame} onChange={this.handleNewGameChange} onSubmit={this.handleGameAdded}/>
        </Table>
        <PageFooter />
      </React.Fragment>
    );
  }
}

export default App;
