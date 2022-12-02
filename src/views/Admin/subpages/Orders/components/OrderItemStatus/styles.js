import styled from 'styled-components';
import colors from '~/utils/colors';

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.color || colors.YELLOW};
  height: 100%;
  border-radius: 20px;
  cursor: pointer;
  color: ${props => props.fontColor || colors.TEXT};

  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .25);
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #FFF;
  border-radius: 20px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
  color: ${colors.TEXT};

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -5px;
  z-index: 1;
`;
