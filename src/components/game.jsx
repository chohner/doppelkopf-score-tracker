import React, { Component } from 'react';
import { Table, Icon, Popup} from 'semantic-ui-react'

class Game extends Component {
  handleItemClick = (gameid) => {
    this.props.onChange(gameid);
  }

  render() {
    const { game, cumulativeScore } = this.props;
    const soloPlayed = game.soloWon || game.soloLost;
    const pointString = soloPlayed ? `${3 * game.points} / ${game.points}` : game.points;
    const rowStyle = { borderTop: game.gameid%4 !== 0 ? undefined : "solid 2px gray"};
    return (
      <Table.Row style={rowStyle}>
        {
          cumulativeScore.map((gameCumSum, idx) => (
            <Table.Cell content={gameCumSum} key={idx} selectable positive={game.winners[idx]} negative={!game.winners[idx]}/>
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
              onClick={() => this.handleItemClick(game.gameid)}
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
