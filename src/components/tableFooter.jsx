import React, { Component } from 'react';
import { Table, Checkbox, Input, Button } from 'semantic-ui-react'

const newState = {
  winner: [false, false, false, false],
  points: 0
};

class TableFooter extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, newState);
  }

  handleWinnerInput = (_, data) => {
    const winner = [...this.state.winner];
    winner[data.playerid] = data.checked;
    this.setState({winner:winner});
  }

  handlePointInput = (_, data) => {
    this.setState({points:data.value});
  }

  resetState = () => {
    this.setState(newState);
  }

  handlePointSubmit= (_, data) => {
    const points = Number(this.state.points);
    let nullGame = points === 0;
    let winnerList = [];

    this.state.winner.forEach((element, idx) => {
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
      this.props.onChange({
        winner: winnerList,
        points: points
      });
      this.resetState();
    }
  }

  render() { 
    return (
      <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox
            playerid="0"
            checked={this.state.winner[0]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell>
        <Checkbox
            playerid="1"
            checked={this.state.winner[1]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell><Checkbox
            playerid="2"
            checked={this.state.winner[2]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell><Checkbox
            playerid="3"
            checked={this.state.winner[3]}
            onChange={this.handleWinnerInput}
          />
        </Table.HeaderCell>
        <Table.HeaderCell>
        <Input fluid
          size='small'
          type='number'
          max={50}
          min={0}
          action={ <Button color='teal' icon='add' onClick={ this.handlePointSubmit } />} 
          onChange={this.handlePointInput}
          value={this.state.points}
          placeholder='Points'/>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    );
  }
}

export default TableFooter;
