import React, { Component } from 'react';
import { Popup, Button } from 'semantic-ui-react';

class PlayerPopup extends Component {
  downloadCSV = () => {this.props.onDownloadCSV();};

  render() {
    return (
      <Popup
        name='csvPopup'
        hideOnScroll
        trigger={this.props.trigger}
        content={
          <Button.Group basic compact>
            <Button icon='arrow alternate circle down outline' color='green' basic compact onClick={this.downloadCSV}  content="Download"/>
          </Button.Group>
        }
        on='click'
        position='bottom center'
      />
    );
  }
}

export default PlayerPopup;
