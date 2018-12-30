import React, { Component } from 'react';
import { Table, Icon, Popup} from 'semantic-ui-react'

class Game extends Component {
  handleItemClick = (idx) => {
    this.props.onChange(idx);
  }

  render() { 
    return (
      <Table.Row style={{ borderTop: this.props.idx%4 !== 0 ? undefined : "solid 2px gray"}}>
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
              idx={this.props.idx}
              onClick={() => this.handleItemClick(this.props.idx)}
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
