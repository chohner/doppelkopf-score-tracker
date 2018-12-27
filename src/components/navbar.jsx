import React from 'react';
import { Menu } from 'semantic-ui-react'

const NavBar = () => {
  return (<Menu>
    <Menu.Item name='icon'>
      <img src='https://react.semantic-ui.com/logo.png' alt='logo'/>
    </Menu.Item>
    <Menu.Item>
      Help
    </Menu.Item>
  </Menu>);
}
 
export default NavBar;
