import React, { Component } from 'react';
import Game from './game';
import { Table } from 'semantic-ui-react'

class GameList extends Component {
  gameToResultPoints(game) {
    const soloWon = game.winner.length === 1;
    const soloLost = game.winner.length === 3;

    const ResultPoints = {0:0, 1:0, 2:0, 3:0};
    Object.keys(ResultPoints).forEach(w => {
      if (game.winner.includes(Number(w))) {
        if (soloWon) {
          ResultPoints[w] += 3 * game.points;
        } else {
          ResultPoints[w] +=game.points;
        } 
      } else {
        if (soloLost) {
          ResultPoints[w] -= 3 * game.points;
        } else {
          ResultPoints[w] -= game.points;
        }
      }
    });
    ResultPoints.soloWon = soloWon;
    ResultPoints.soloLost = soloLost;

    return ResultPoints;
  }

  gameListToPointList(gameList) {
    const pointList = [];
    gameList.forEach((game, idx) => {
      const ResultPoints = this.gameToResultPoints(game);
      pointList.push({
        gameid: game.gameid,
        points: game.points,
        soloWon: ResultPoints.soloWon,
        soloLost: ResultPoints.soloLost,
        0: idx === 0 ? ResultPoints[0] : ResultPoints[0] + pointList[pointList.length-1][0],
        1: idx === 0 ? ResultPoints[1] : ResultPoints[1] + pointList[pointList.length-1][1],
        2: idx === 0 ? ResultPoints[2] : ResultPoints[2] + pointList[pointList.length-1][2],
        3: idx === 0 ? ResultPoints[3] : ResultPoints[3] + pointList[pointList.length-1][3],
      })
    });
    return pointList;
  }

  render() {
    const PointList = this.gameListToPointList(this.props.games);

    return (
      <Table.Body>
        {PointList.map((game, idx) => (
          <Game
          key={idx}
          game={game}
          onChange={this.props.onChange}
          />
        ))}
      </Table.Body>
    )
  }
}

export default GameList;
