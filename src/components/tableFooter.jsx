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
    const checkboxes = this.props.newGame.checkboxes.slice();
    checkboxes[data.playerid].checked = data.checked;
    this.props.onChange({checkboxes:checkboxes});
  }

  handlePointInput = (_, data) => {
    this.props.onChange({points:data.value});
  }

  handlePointSubmit= (_, data) => {
    const { points, checkboxes } = this.props.newGame;
    let nullGame = points === "0";
    let winnerList = [];

    checkboxes.forEach((checkbox, idx) => {
      if (checkbox.checked) {
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
      this.props.onSubmit(this.props.newGame)
    }
  }

  render() { 
    const { newGame } = this.props;
    return (
      <Table.Footer fullWidth>
        <Table.Row>
          {newGame.checkboxes.map((checkbox, idx) => (
            <Table.HeaderCell key={idx}>
              <Checkbox
                playerid={idx}
                checked={checkbox.checked}
                onChange={this.handleWinnerInput}/>
            </Table.HeaderCell>
          ))}
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
              value={newGame.points}
              placeholder='Points'/>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
}

export default TableFooter;
