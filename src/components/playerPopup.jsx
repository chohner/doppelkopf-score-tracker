import React, { Component } from 'react';
import { Popup, Button } from 'semantic-ui-react';

class PlayerPopup extends Component {

  removePlayer = () => {this.props.onPlayerDelete();};
  addNewPlayer = () => {this.props.onPlayerAdd();};

  render() {
    return (
      <Popup
        name='playerPopup'
        hideOnScroll
        trigger={this.props.trigger}
        content={
          <Button.Group basic compact>
            <Button icon='remove' color='red' basic compact onClick={this.removePlayer} content="Remove"/>
            <Button icon='add' color='green' basic compact onClick={this.addNewPlayer}  content="Add"/>
          </Button.Group>
        }
        on='click'
        position='bottom center'
      />
    );
  }
}

export default PlayerPopup;
