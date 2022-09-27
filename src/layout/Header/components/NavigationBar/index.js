import React from "react";
import { useLocation } from 'react-router-dom';
import menus from "../../menus";

import { NavigationBarContainer, MenuContainer, StyledLink } from './styles';

import { Inline } from "~/components";

function Menu(props) {
  const location = useLocation();

  return (
    <MenuContainer active={props.path === location.pathname}>
      <StyledLink to={props.to} active={props.path === location.pathname}>{props.children}</StyledLink>
    </MenuContainer>
  );
}

function NavigationBar() {
  return (
    <Inline style={{ height: '100%' }} right>
      <NavigationBarContainer>
        {
          menus.map((menu, index) => (
            <Menu key={index} {...menu}>{menu.name}</Menu>
          ))
        }
      </NavigationBarContainer>
    </Inline>
  );
}

export default NavigationBar;
