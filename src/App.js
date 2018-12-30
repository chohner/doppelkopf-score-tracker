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
      {id:0, name:"Player 1"},
      {id:1, name:"Player 2"},
      {id:2, name:"Player 3"},
      {id:3, name:"Player 4"}
    ],
    games: [],
    newGame: {
      gameid: 0,
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
    if (newGame.gameid > this.state.games.length - 1) {
      games.push({
        gameid: this.state.games.length,
        winner: newGame.winner,
        points: newGame.points
      })
    } else {
      games[newGame.gameid] = {
        gameid: newGame.gameid,
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
    const newGame = {
      gameid: idx,
      winner: [false, false, false, false],
      points: game.points
    }

    game.winner.forEach(winnerIDX => {
      newGame.winner[winnerIDX] = true
    });

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
  