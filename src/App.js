import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import GameList from './components/gamelist';
import TableHeader from './components/tableHeader';
import TableFooter from './components/tableFooter';
import { Table } from 'semantic-ui-react'
import ls from 'local-storage'

function emptyState() {
  return {
    players: [
      {id:0, name:"Player 1"},
      {id:1, name:"Player 2"},
      {id:2, name:"Player 3"},
      {id:3, name:"Player 4"}
    ],
    games: [],
    newGame: {
      idx:0,
      winner: [false, false, false, false],
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
  
  handleGameAdded = (newGame) => {
    const games  = [...this.state.games];
    if (newGame.idx > this.state.games.length - 1) {
      games.push({
        gameID: this.state.games.length,
        winner: newGame.winner,
        points: newGame.points
      })
    } else {
      games[newGame.idx] = {
        gameID: newGame.idx,
        winner: newGame.winner,
        points: newGame.points
      }
    }
    this.setState({games:games})
    ls.set('games', games);

    this.resetNewGame(games.length);
  }

  handleNewGameChange = (newGame) => {
    const newGameState = this.state.newGame;
    if (newGame.winner !== undefined) {
      newGameState.winner = newGame.winner;
    } else if (newGame.points !== undefined) {
      newGameState.points = newGame.points;
    }
    this.setState({newGame:newGameState})
    ls.set('newGame', newGameState);
  }

  resetNewGame = (newIDX) => {
    const emptyState = this.emptyState();
    emptyState.newGame.idx = newIDX;
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

  handleGameChange = (gameid) => {
    const game = this.state.games[gameid];
    const newGame = {
      idx: gameid,
      winner: [false, false, false, false],
      points: game.points
    }

    game.winner.forEach(winnerIDX => {
      newGame.winner[winnerIDX] = true
    });

    this.setState({newGame:newGame});
  }

  render() {
    return (
      <React.Fragment>
      <NavBar onReset={this.handleReset}/>
      <Table selectable unstackable columns={5} striped textAlign='center' style={{borderCollapse: "collapse"}}>
        <TableHeader players={this.state.players} onChange={this.handlePlayerChange}/>
        <GameList games={this.state.games} onChange={this.handleGameChange}/>
        <TableFooter newGame={this.state.newGame} onChange={this.handleNewGameChange} onSubmit={this.handleGameAdded}/>
      </Table>
      </React.Fragment>
      );
    }
  }
  
  export default App;
  