import React, { Component } from 'react';
import { Menu, Icon, Popup, Button } from 'semantic-ui-react'

class NavBar extends Component {
  state = { resetPopupOpen: false }

  handleItemClick = (_, data) => {
    if (data.name === "reset") {
      this.setState({ resetPopupOpen: false })
      this.props.onReset()
    }
  };

  handleOpen = () => {
    this.setState({ resetPopupOpen: true })
  }

  handleClose = () => {
    this.setState({ resetPopupOpen: false })
  }

  render() { 
    return (
      <Menu secondary>
        <Menu.Item name='icon'>
          <img src='https://react.semantic-ui.com/logo.png' alt='logo'/>
        </Menu.Item>
        <Menu.Item name='reviews' content='Help' onClick={this.handleItemClick}/>
        <Popup
          name='resetPopup'
          hideOnScroll
          open={this.state.resetPopupOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          trigger={
            <Menu.Item position='right'>
            <Icon name='delete' color='orange'/> Reset
          </Menu.Item>
        }
          content={<Button color='red' name='reset' content='Confirm reset' onClick={this.handleItemClick}/>}
          on='click'
        />
      </Menu>
    );
  }
}

export default NavBar;
