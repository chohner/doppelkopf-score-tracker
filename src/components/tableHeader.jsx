import React, { Component } from 'react';
import { Table, Form, Input } from 'semantic-ui-react'

class TableHeader extends Component {
  handleChange = (event) => {
    const players = [...this.props.players];
    players[event.target.id].name = event.target.value;
    this.props.onChange(players);
  }

  render() { 
    const nameStyle = {
      textAlign: "center",
      fontWeight: "bold"
    };

    return ( 
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Form>
              <Input transparent type="text" placeholder="Player 1" id={0} value={this.props.players[0].name} onChange={this.handleChange}>
                <input style={nameStyle} />
              </Input>
            </Form>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Form>
              <Input transparent type="text" placeholder="Player 2" id={1} value={this.props.players[1].name} onChange={this.handleChange}>
                <input style={nameStyle} />
              </Input>
            </Form>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Form>
              <Input transparent type="text" placeholder="Player 3" id={2} value={this.props.players[2].name} onChange={this.handleChange}>
                <input style={nameStyle} />
              </Input>
            </Form>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Form>
              <Input transparent type="text" placeholder="Player 4" id={3} value={this.props.players[3].name} onChange={this.handleChange}>
                <input style={nameStyle} />
              </Input>
            </Form>
          </Table.HeaderCell>
          <Table.HeaderCell>{"Game"}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}

export default TableHeader;
