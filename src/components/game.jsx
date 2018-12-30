import React, { Component } from 'react';
import { Table, Icon, Popup} from 'semantic-ui-react'

class Game extends Component {
  handleItemClick = (gameid) => {
    this.props.onChange(gameid);
  }

  render() { 
    return (
      <Table.Row style={{ borderTop: this.props.gameid%4 !== 0 ? undefined : "solid 2px gray"}}>
        <Table.Cell>{this.props.game[0]}</Table.Cell>
        <Table.Cell>{this.props.game[1]}</Table.Cell>
        <Table.Cell>{this.props.game[2]}</Table.Cell>
        <Table.Cell>{this.props.game[3]}</Table.Cell>

        <Popup
          hideOnScroll
          trigger={
            <Table.Cell>
            {(this.props.game.soloWon || this.props.game.soloLost) ? `${3 * this.props.game.points} / ${this.props.game.points}` : this.props.game.points}
            </Table.Cell>
            }
          content={
            <Icon
              name='edit outline'
              onClick={() => this.handleItemClick(this.props.game.gameid)}
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
