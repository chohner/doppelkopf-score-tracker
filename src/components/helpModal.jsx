import React from 'react';
import { Modal} from 'semantic-ui-react';

const HelpModal = (props) => {
  return (
    <Modal basic trigger={props.trigger} centered={false}>
      <Modal.Header>Help</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>You can add a game by entering the game score and winners. Solos points are calculated automatically.</p>
          <p>You can edit a previous game by clicking on the corresponding score and hitting the edit icon. It will populate the bottom row, adding the game will edit in place.</p>
          <p>You can edit player names by clicking on them.</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default HelpModal;
