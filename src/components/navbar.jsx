import React, { Component } from 'react';
import { Menu, Icon, Label, Header } from 'semantic-ui-react';
import HelpModal from './helpModal';
import ResetPopup from './resetPopup';
import PlayerPopup from './playerPopup';
import CsvPopup from './csvPopup';

class NavBar extends Component {
  handleResetClick = () => {
    this.props.onReset();
  };

  render() {
    return (
      <Menu secondary>
        <Menu.Item content={<img src={require('../logo.svg')} alt='logo'/>}/>
        <HelpModal trigger={<Menu.Item name='help' content={<Header as='h3' content="Doko Butler"/>}/>}/>
        <PlayerPopup
          onPlayerAdd={this.props.onPlayerAdd}
          onPlayerDelete={this.props.onPlayerDelete}
          trigger={<Menu.Item content="Players"/>}
        />
        <CsvPopup
          onDownloadCSV={this.props.onDownloadCSV}
          trigger={<Menu.Item position='left' content="CSV"/>}
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
