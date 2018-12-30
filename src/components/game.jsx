import React from 'react';
import { Table } from 'semantic-ui-react'

const Game = props => {
  return (
    <Table.Row style={{ borderTop: props.idx%4 !== 0 ? undefined : "solid 2px gray"}}>
        <Table.Cell>{props.game[0]}</Table.Cell>
        <Table.Cell>{props.game[1]}</Table.Cell>
        <Table.Cell>{props.game[2]}</Table.Cell>
        <Table.Cell>{props.game[3]}</Table.Cell>
        <Table.Cell>{
          (props.game.soloWon || props.game.soloLost) ? `${3 * props.game.points} / ${props.game.points}` : props.game.points
        }</Table.Cell>
      </Table.Row>
  );
}

export default Game;
