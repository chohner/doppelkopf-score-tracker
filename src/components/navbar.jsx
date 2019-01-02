import React, { Component } from 'react';
import { Menu, Icon, Label, Header } from 'semantic-ui-react';
import HelpModal from './helpModal';
import ResetPopup from './resetPopup';
import PlayerPopup from './playerPopup';

class NavBar extends Component {
  handleResetClick = () => {
    this.props.onReset()
  };

  render() { 
    return (
      <Menu secondary>
        <Menu.Item content={<img src={require('../logo.svg')} alt='logo'/>}/>
        <Menu.Item content={<Header as='h3' content="Doko Butler"/>}/>
        <HelpModal trigger={<Menu.Item name='help' content='Help'/>}/>
        <PlayerPopup
          onPlayerAdd={this.props.onPlayerAdd}
          onPlayerDelete={this.props.onPlayerDelete}
          trigger={<Menu.Item position='right' content="Players"/>}
        />
        <ResetPopup onReset={this.handleResetClick} trigger={
          <Menu.Item position='right' content={
            <Label basic color='red'>
              <Icon name='delete'/> Reset
            </Label>
          }/>
        } />
      </Menu>
    );
  }
}

export default NavBar;
