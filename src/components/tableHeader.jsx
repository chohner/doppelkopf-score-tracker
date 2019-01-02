import React, { Component } from 'react';
import { Table, Form, Input } from 'semantic-ui-react';

class TableHeader extends Component {
  handleChange = (event) => {
    const players = [...this.props.players];
    players[event.target.id].name = event.target.value;
    this.props.onChange(players);
  }

  render() {
    const nameStyle = {
      textAlign: "center",
      fontWeight: "bold",
    };

    return (
      <Table.Header>
        <Table.Row>
          {this.props.players.map((player, idx) => (
            <Table.HeaderCell key={idx} hidden={!player.active}>
              <Form>
                <Input transparent type="text" placeholder={`Player ${player.id}`} id={player.id} value={player.name} onChange={this.handleChange}>
                  <input style={nameStyle} />
                </Input>
              </Form>
            </Table.HeaderCell>
          ))}
          <Table.HeaderCell>{"Game"}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}

export default TableHeader;
