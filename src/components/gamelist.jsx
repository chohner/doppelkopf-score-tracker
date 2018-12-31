import React, { Component } from 'react';
import Game from './game';
import { Table } from 'semantic-ui-react'

class GameList extends Component {
  gameToResultPoints(game) {
    const soloWon = game.winner.length === 1;
    const soloLost = game.winner.length === 3;

    const playerPoints = [{}, {}, {}, {}];
    playerPoints.forEach((_, idx) => {
      if (game.winner.includes(idx)) {
        playerPoints[idx].score = soloWon ? 3 * game.points : game.points;
        playerPoints[idx].winner = true;
      } else {
        playerPoints[idx].score = soloLost ? -3 * game.points : -game.points;
        playerPoints[idx].winner = false;
      }
    });

    return {
      playerPoints,
      soloWon,
      soloLost,
    };
  }

  gameListToPointList(gameList) {
    const pointList = [];
    gameList.forEach((game, gameidx) => {
      const {playerPoints, soloWon, soloLost} = this.gameToResultPoints(game);

      const cumulativeScore = playerPoints.map((_, playeridx) => {
        let cumPoints = playerPoints[playeridx];
        if (gameidx !== 0) {
          cumPoints.score += pointList[gameidx-1].cumulativeScore[playeridx].score
        }
        return cumPoints
      });

      pointList.push({
        gameid: game.gameid,
        points: game.points,
        soloWon,
        soloLost,
        cumulativeScore
      })
    });
    return pointList;
  }

  render() {
    const PointList = this.gameListToPointList(this.props.games);

    return (
      <Table.Body>
        {PointList.map((gamePoints, idx) => (
          <Game
            key={idx}
            gamePoints={gamePoints}
            onChange={this.props.onChange}
          />
        ))}
      </Table.Body>
    )
  }
}

export default GameList;
