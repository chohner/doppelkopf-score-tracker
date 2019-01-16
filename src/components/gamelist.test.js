import React from 'react';
import ReactDOM from 'react-dom';
import Gamelist from './gamelist';

it('renders without crashing', () => {
  const table = document.createElement('table');
  ReactDOM.render(<Gamelist games={[]} playerCount={4}/>, table);
  ReactDOM.unmountComponentAtNode(table);
});

it('creates a correct empty game', () => {
  const emptySingleGame = {
    gameid: 0,
    points: [ 0, 0, 0, 0 ],
    winners: [ false, false, false, false ],
    soloWon: false,
    soloLost: false,
  };
  expect(Gamelist.prototype.emptyGame(4)).toEqual(emptySingleGame);
});

it('computes cumulative 2d sum', () => {
  const listOfGames = [[0, 1], [1, 2]];
  const cumSum2d = [[0, 1], [1, 3]];
  expect(Gamelist.prototype.cumsum2d(listOfGames)).toEqual(cumSum2d);
});

it('cumulative 2d sum handles null', () => {
  const listOfGames = [[0, 1], [1, null]];
  const cumSum2d = [[0, 1], [1, 1]];
  expect(Gamelist.prototype.cumsum2d(listOfGames)).toEqual(cumSum2d);
});
