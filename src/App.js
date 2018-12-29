import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import GameList from './components/gamelist';
import TableHeader from './components/tableHeader';
import TableFooter from './components/tableFooter';
import { Table } from 'semantic-ui-react'
import ls from 'local-storage'

const emptyState = {
  players: [
    {id:0, name:"Player 1"},
    {id:1, name:"Player 2"},
    {id:2, name:"Player 3"},
    {id:3, name:"Player 4"}
  ],
  games: [],
}

class App extends Component {
  state = {
    players: ls.get('players') || emptyState.players,
    games: ls.get('games') || emptyState.games,
  }

  handlePlayerChange = (newPlayers) => {
    this.setState({players:newPlayers})
    ls.set('players', newPlayers);
  }
  
  handleGameAdded = (newGame) => {
    const games  = [...this.state.games];
    games.push({
      gameID: this.state.games.length,
      winner: newGame.winner,
      points: newGame.points
    })

    this.setState({games:games})
    ls.set('games', games);
  }

  handleReset = () => {
    this.setState(emptyState);
    ls.set('players', emptyState.players);
    ls.set('games', emptyState.games);
  }

  render() {
    return (
      <React.Fragment>
      <NavBar onReset={this.handleReset}/>
      <Table selectable unstackable columns={5} striped textAlign='center' style={{borderCollapse: "collapse"}}>
        <TableHeader players={this.state.players} onChange={this.handlePlayerChange}/>
        <GameList games={this.state.games}/>
        <TableFooter onChange={this.handleGameAdded}/>
      </Table>
      </React.Fragment>
      );
    }
  }
  
  export default App;
  