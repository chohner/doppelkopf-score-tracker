import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import Gamelist from './gamelist';

const colors = [
  'rgba(22, 70, 112,1)',
  'rgba(145, 80, 150,1)',
  'rgba(245, 89, 110,1)',
  'rgba(255, 166, 0,1)',
];

class ScorePlot extends Component {
  render() {
    const {players, playerCount, games} = this.props;

    if (games.length > 0) {
      const plotLayout = {
        labels: Array.from({length: games.length}, (v, k) => k),
        datasets: [],
      };

      const cumSum2d = Gamelist.prototype.cumsum2d(games.map(game => game.score));

      for (let idx = 0; idx < playerCount; idx++) {
        plotLayout.datasets.push({
          label: players[idx].name,
          fill: false,
          borderColor: colors[idx],
          backgroundColor: colors[idx],
          lineTension: 0.2,
          data: cumSum2d.map(game => game[idx]),
        });
      }
      plotLayout.datasets.forEach(dataset => { dataset.data.unshift(0); });

      const panels = [
        {
          key: 'plot',
          title: 'Progress plot',
          content: {content: (<Line data={plotLayout} />)},
        },
      ];

      return (
        <Accordion defaultActiveIndex={-1} panels={panels} />
      );
    } else {
      return (null);
    }
  }
}

export default ScorePlot;
