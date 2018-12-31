import React, { Component } from 'react';
import { Table, Icon, Popup} from 'semantic-ui-react'

class Game extends Component {
  handleItemClick = (gameid) => {
    this.props.onChange(gameid);
  }

  render() {
    const { gamePoints } = this.props;
    const soloPlayed = gamePoints.soloWon || gamePoints.soloLost;
    const pointString = soloPlayed ? `${3 * gamePoints.points} / ${gamePoints.points}` : gamePoints.points;
    const rowStyle = { borderTop: gamePoints.gameid%4 !== 0 ? undefined : "solid 2px gray"};
    return (
      <Table.Row style={rowStyle}>
        {
          gamePoints.cumulativeScore.map((game, idx) => (
            <Table.Cell content={game.score} key={idx} selectable positive={game.winner} negative={!game.winner}/>
          ))
        }
        <Popup
          hideOnScroll
          trigger={
            <Table.Cell content={pointString}/>
          }
          content={
            <Icon
              name='edit outline'
              onClick={() => this.handleItemClick(gamePoints.gameid)}
            />
          }
          on='click'
          position='top center'
        />
      </Table.Row>
    );
  }
}

export default Game;
