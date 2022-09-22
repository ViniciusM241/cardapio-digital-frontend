import styled from "styled-components";
import colors from "~/utils/colors";

export const Container = styled.div`
  background-color: ${colors.YELLOW};
  border-top-right-radius: 50px;

  width: 100%;
  height: 10%;
  max-height: 50px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const CartWrapper = styled.div`
  width: 70px;
  height: 70px;
  background-color: #FFF;
  border-radius: 35px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -35px;
  right: 10px;

  &::before {
    content: '${props => props.itemsLength || 0}';
    min-width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: ${colors.RED};
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    z-index: 2;
    bottom: -2px;
    right: 2px;
  }
`;

export const Value = styled.p`
  font-size: 1.3rem;
  color: ${colors.BROWN_TEXT};

  & > strong {
    font-weight: bolder;
    font-size: 1.3rem;
  }
`;

export const CartItemWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);

  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  &.closed {
    top: 100vh;
  }
`;

export const CartItems = styled.div`
  width: 100%;
  height: 90vh;
  background-color: #FFF;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;

  position: fixed;
  left: 0;
  right: 0;

  transition: bottom .2s ease-out;

  &.opened {
    bottom: 0;
  }

  &.closed {
    bottom: -90vh;
  }
`;

export const CartItemsWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 70vh;
  overflow-y: scroll;
  padding-right: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.hasItems ? 'flex-start' : 'center'};
`;

export const Total = styled.p`
  & > strong {
    font-size: 1.8rem;
  }
`;

export const Wrapper = styled.div`
  width: inherit;
  height: calc(90vh - 20px);
  display: flex;

  flex-direction: column;
  justify-content: space-between;
`;
