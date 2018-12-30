import React, { Component } from 'react';
import { Table, Icon, Popup} from 'semantic-ui-react'

class Game extends Component {
  handleItemClick = (gameid) => {
    this.props.onChange(gameid);
  }

  render() {
    const { gamePoints } = this.props;
    const pointString = (gamePoints.soloWon || gamePoints.soloLost) ? `${3 * gamePoints.points} / ${gamePoints.points}` : gamePoints.points;
    const rowStyle = { borderTop: gamePoints.gameid%4 !== 0 ? undefined : "solid 2px gray"};
    return (
      <Table.Row style={rowStyle}>
        <Table.Cell content={gamePoints[0]}/>
        <Table.Cell content={gamePoints[1]}/>
        <Table.Cell content={gamePoints[2]}/>
        <Table.Cell content={gamePoints[3]}/>
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
