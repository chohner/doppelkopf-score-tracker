import React from 'react';
import { Modal} from 'semantic-ui-react';

const HelpModal = (props) => {
  return (
    <Modal basic trigger={props.trigger} centered={false} closeIcon>
      <Modal.Header>Doppelkopf Score Tracker</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Doppelkopf Score Tracker is a little web app that helps you keep track of your Doppelkopf score.</p>
          <ul>
            <li>To change a player name, simply click on a name and start typing</li>
            <li>To add a game, use the bottom row to enter the score and select who won that round</li>
            <li>To add/remove players, click Players and select Add or Remove. Player count is limited between 4 and 7 and may be changed any time.</li>
            <li>To edit a previous game, select the corresponding score and click the edit icon. It will populate the bottom row with the game data</li>
            <li>To reset everything, click the red RESET on the top right and confirm</li>
            <li>Games with a score of 0 must have no winners, games with a score &gt;0 must have a least one winner</li>
          </ul>
          <p>Don't worry if you accidentally reload or close the page - Doppelkopf Score Tracker will keep the score.</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default HelpModal;
