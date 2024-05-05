import React, { Component } from "react";
import { Popup, Button } from "semantic-ui-react";

class ResetPopup extends Component {
  state = { resetPopupOpen: false };

  handleClick = () => {
    this.setState({ resetPopupOpen: false });
    this.props.onReset();
  };

  handleOpen = () => {
    this.setState({ resetPopupOpen: true });
  };

  handleClose = () => {
    this.setState({ resetPopupOpen: false });
  };

  render() {
    return (
      <Popup
        name="resetPopup"
        hideOnScroll
        open={this.state.resetPopupOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        trigger={this.props.trigger}
        content={
          <Button
            color="red"
            name="reset"
            content="Confirm reset"
            onClick={this.handleClick}
          />
        }
        on="click"
        position="bottom right"
      />
    );
  }
}

export default ResetPopup;
