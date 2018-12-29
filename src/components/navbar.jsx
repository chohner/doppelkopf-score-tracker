import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'

class NavBar extends Component {
  handleItemClick = (_, data) => {
    if (data.name === "reset") {
      this.props.onReset()
    }
  };

  render() { 
    return (
      <Menu secondary>
        <Menu.Item name='icon'>
          <img src='https://react.semantic-ui.com/logo.png' alt='logo'/>
        </Menu.Item>
        <Menu.Item name='reviews' content='Help' onClick={this.handleItemClick}/>
        <Menu.Item name='reset' onClick={this.handleItemClick} position='right'>
          <Icon name='delete' color='orange'/> Reset
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
