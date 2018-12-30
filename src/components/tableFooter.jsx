import React, { Component } from 'react';
import { Table, Checkbox, Input, Button } from 'semantic-ui-react'

class TableFooter extends Component {
  handleFocus = (event) => {
    const el = event.currentTarget;
      setTimeout(() => {
          el.select();
      }, 0);
  }

  handleWinnerInput = (_, data) => {
    const winner = [...this.props.newGame.winner];
    winner[data.playerid] = data.checked;
    this.props.onChange({winner:winner});
  }

  handlePointInput = (_, data) => {
    this.props.onChange({points:data.value});
  }

  handlePointSubmit= (_, data) => {
    const points = Number(this.props.newGame.points);
    let nullGame = points === 0;
    let winnerList = [];

    this.props.newGame.winner.forEach((element, idx) => {
      if (element) {
        winnerList.push(idx);
      }
    });

    if (nullGame && winnerList.length !== 0) {
      console.warn("Null game must have zero winners.");
    } else if (winnerList.length === 0 && !nullGame) {
      console.warn("Zero winners must be nullgame.");
    } else if (winnerList.length > 3) {
      console.warn("Can't have more than 3 winners.");
    } else {
      this.props.onSubmit({
        gameid: this.props.newGame.gameid,
        winner: winnerList,
        points: points
      });
    }
  }

  render() { 
    return (
      <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox
            playerid="0"
            checked={this.props.newGame.winner[0]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell>
        <Checkbox
            playerid="1"
            checked={this.props.newGame.winner[1]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell><Checkbox
            playerid="2"
            checked={this.props.newGame.winner[2]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell><Checkbox
            playerid="3"
            checked={this.props.newGame.winner[3]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell>
        <Input fluid
          size='mini'
          type='number'
          pattern="\d*"
          max={50}
          min={0}
          action={ <Button compact color='teal' icon='add' size='mini' onClick={ this.handlePointSubmit } />} 
          onFocus={this.handleFocus}
          onChange={this.handlePointInput}
          value={this.props.newGame.points}
          placeholder='Points'/>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    );
  }
}

export default TableFooter;
