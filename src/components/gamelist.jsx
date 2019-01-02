import React, { Component } from 'react';
import Game from './game';
import { Table } from 'semantic-ui-react'

class GameList extends Component {
  emptyGame(playerCount) {
    return {
      gameid: 0,
      points: Array(playerCount).fill(0),
      winners: Array(playerCount).fill(false),
      soloWon: false,
      soloLost: false
    }
  }

  cumsum2d(array_2d) {
    const cumSum = Array(array_2d.length).fill(Array(array_2d[0].length))
    cumSum[0] = array_2d[0]
    array_2d.slice(1).forEach((innerArr, arridx) => {
      cumSum[arridx+1] =  innerArr.map((val, validx) => {
        return val + cumSum[arridx][validx];
      })
    })
    return cumSum
  }

  render() {
    const { games, playerCount } = this.props;
    let gamesRender;
    if (games.length > 0) {
      const scores = games.map(game => game.score);
      const cumulativeScore = this.cumsum2d(scores)
      gamesRender = games.map((game, idx) => (
        <Game
          key={idx}
          game={game}
          playerCount={playerCount}
          cumulativeScore={cumulativeScore[idx]}
          onChange={this.props.onChange}
        />
      ))
    }

    return (
      <Table.Body>{gamesRender}</Table.Body>
    )
  }
}

export default GameList;
