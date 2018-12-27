import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import GameList from './components/gamelist';
import TableHeader from './components/tableHeader';
import TableFooter from './components/tableFooter';
import { Table } from 'semantic-ui-react'

class App extends Component {
  state = {
    players: [
      {id:0, name:"Player 1"},
      {id:1, name:"Player 2"},
      {id:2, name:"Player 3"},
      {id:3, name:"Player 4"}
    ],
    games: [
      {
        gameID: 0,
        winner: [1, 2],
        points: 2,
      },
      {
        gameID: 1,
        winner: [0, 2],
        points: 1,
      },
      {
        gameID: 2,
        winner: [1, 0],
        points: 5,
      },
      {
        gameID: 3,
        winner: [1, 0],
        points: 5,
      },
      {
        gameID: 4,
        winner: [1, 0],
        points: 5,
      }
    ],
  }

  handlePlayerChange = (newPlayers) => {
    this.setState({players:newPlayers})
  }
  
  handleGameAdded = (newGame) => {
    const games  = [...this.state.games];
    games.push({
      gameID: this.state.games.length,
      winner: newGame.winner,
      points: newGame.points
    })

    this.setState({games:games})
  }

  render() {
    return (
      <React.Fragment>
      <NavBar/>
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
  