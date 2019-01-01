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
      {playerid: 0, name: "Player 1", playing: true},
      {playerid: 1, name: "Player 2", playing: true},
      {playerid: 2, name: "Player 3", playing: true},
      {playerid: 3, name: "Player 4", playing: true}
    ],
    games: [],
    newGame: {
      gameid: 0,
      checkboxes: [
        {playerid: 0, checked: false},
        {playerid: 1, checked: false},
        {playerid: 2, checked: false},
        {playerid: 3, checked: false},
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
  }
  emptyState = emptyState;

  handlePlayerChange = (newPlayers) => {
    this.setState({players:newPlayers})
    ls.set('players', newPlayers);
  }

  newGameToGame(newGame) {
    const points = Number(newGame.points);
    const winners = newGame.checkboxes.map((checkbox) => {
      return checkbox.checked
    })
    const winnerCount = winners.reduce((n, val) => n + (val === true));
    const soloWon = winnerCount === 1;
    const soloLost = winnerCount === 3;

    const score = winners.map(winner => {
      return winner ? 
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

  handleNewGameChange = (newGame) => {
    const newGameState = this.state.newGame;
    if (newGame.checkboxes !== undefined) {
      newGameState.checkboxes = newGame.checkboxes;
    } 
    if (newGame.points !== undefined) {
      newGameState.points = newGame.points;
    }
    this.setState({newGame:newGameState})
    ls.set('newGame', newGameState);
  }

  resetNewGame = (newIDX) => {
    const emptyState = this.emptyState();
    emptyState.newGame.gameid = newIDX;
    this.setState({newGame:emptyState.newGame})
    ls.set('newGame', emptyState.newGame);
  }

  handleReset = () => {
    const emptyState = this.emptyState();
    this.setState(emptyState);
    ls.set('players', emptyState.players);
    ls.set('games', emptyState.games);
    ls.set('newGame', emptyState.newGame);
  }

  handleGameChange = (idx) => {
    const game = this.state.games[idx];
    const newGame = this.emptyState().newGame;
    newGame.checkboxes.map((checkbox, idx) => {
      return checkbox.checked = game.winners[idx];
    })
    newGame.points = game.points;
    newGame.gameid = game.gameid;
    this.setState({newGame:newGame});
  }

  render() {
    const { players, games, newGame } = this.state

    return (
      <React.Fragment>
        <NavBar onReset={this.handleReset}/>
        <Table fixed selectable unstackable columns={5} striped textAlign='center' size='small' style={{borderCollapse: "collapse"}}>
          <TableHeader players={players} onChange={this.handlePlayerChange}/>
          <GameList games={games} onChange={this.handleGameChange}/>
          <TableFooter newGame={newGame} onChange={this.handleNewGameChange} onSubmit={this.handleGameAdded}/>
        </Table>
        <PageFooter />
      </React.Fragment>
    );
  }
}

export default App;
