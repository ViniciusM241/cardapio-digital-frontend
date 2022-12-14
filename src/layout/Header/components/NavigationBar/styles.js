import styled from "styled-components";
import colors from "~/utils/colors";
import { Link } from "react-router-dom";

export const NavigationBarContainer = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  overflow-x: scroll;

  position: relative;

  &::after {
    content: '';
    height: 5px;
    width: 100%;
    background-color: ${colors.GREEN};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    position: absolute;
    bottom: 0;
    z-index: 2;
  }
`;

export const MenuContainer = styled.div`
  width: fit-content;
  min-width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${props => props.active ? '9px 20px 10px' : '9px 20px 15px'};
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  background-color: ${props => props.active ? colors.GREEN : 'transparent'};
`;

export const StyledLink = styled(Link)`
  color: ${colors.TEXT};
  text-decoration: none;

  color: ${props => props.active ? '#FFF' : colors.TEXT};

  &:hover {
    text-decoration: underline;
  }
`;
