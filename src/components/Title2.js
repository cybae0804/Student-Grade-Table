import React from 'react'
import {
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const TopMenu = () => (
  <div className="topMenuContainer">
    <Menu fixed='top' inverted>
        <Menu.Item header>
          <h2>Student Grade Table</h2>
        </Menu.Item>

        <Dropdown item simple text='Account'>
          <Dropdown.Menu>
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </Menu>
  </div>
)

export default TopMenu;