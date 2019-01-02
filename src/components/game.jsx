import React, { Component } from 'react';
import { Table, Icon, Popup} from 'semantic-ui-react';

class Game extends Component {
  handleItemClick = (gameid) => {
    this.props.onChange(gameid);
  }

  render() {
    const { game, cumulativeScore, playerCount } = this.props;
    const soloPlayed = game.soloWon || game.soloLost;
    const pointString = soloPlayed ? `${3 * game.points} / ${game.points}` : game.points;
    const rowStyle = { borderTop: game.gameid%playerCount !== 0 ? null : "solid 2px gray"};
    const rowCells = game.score.map((score, idx) => {
      const cellContent = score === null ? "-" : cumulativeScore[idx];
      const cellPositive = game.winners[idx];
      const cellNegative = game.winners[idx] === false && game.points !== 0;
      const hidden = idx >= playerCount;
      return <Table.Cell content={cellContent} key={idx} positive={cellPositive} negative={cellNegative} hidden={hidden}/>;
    });

    return (
      <Table.Row style={rowStyle}>
        {rowCells}
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
