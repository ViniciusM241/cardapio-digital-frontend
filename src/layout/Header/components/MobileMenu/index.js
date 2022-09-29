import React from 'react';
import menus from "../../menus";

import { Container, MenuContainer } from './styles';
import { MdLogout } from 'react-icons/md';

import {
  Inline,
  T1,
  Line,
} from '~/components';
import MenuItem from '../MenuItem';

const logoutMenu = {
  path: '/administrativo/sair',
  to: '/administrativo/sair',
  name: 'Sair',
  icon: MdLogout,
};

function MobileMenu({ isOpened, toggleMenuOpened }) {
  return (
    <>
      <Container className={isOpened ? 'opened' : 'closed'} />
      <MenuContainer className={isOpened ? 'opened' : 'closed'}>
        <Inline className="mt-10" style={{ justifyContent: 'space-between' }}>
          <T1>Perrón! Tex Mex</T1>
          <T1 onClick={toggleMenuOpened} style={{ fontWeight: 'normal' }}>X</T1>
          <Inline className="mt-40">
            {
              menus.map((menu, index) => (
                <React.Fragment key={index}>
                  <MenuItem menu={menu} toggleMenuOpened={toggleMenuOpened} />
                  <Line />
                </React.Fragment>
              ))
            }
            <MenuItem menu={logoutMenu} toggleMenuOpened={toggleMenuOpened} />
            <Line />
          </Inline>
        </Inline>
      </MenuContainer>
    </>
  );
}

export default MobileMenu;
