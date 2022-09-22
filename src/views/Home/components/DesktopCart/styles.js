import styled from "styled-components";
import colors from "~/utils/colors";

export const CartContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Container = styled.div`
  width: 100%;
  background-color: ${colors.YELLOW};
  height: 40px;
  border-radius: 20px;
  cursor: pointer;

  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .25);
`;

export const CartWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: #FFF;
  border-radius: 30px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .25);

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -10px;
  z-index: 1;

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
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .25);

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
    font-weight: bold;
    font-size: 1.3rem;
  }
`;

export const CartItemWrapper = styled.div`
  width: 350px;
  min-height: 310px;
  height: 450px;

  padding: 10px 15px;
  border-radius: 20px;
  border-top-right-radius: 0;
  border: 1px solid #dfdfdf;

  background-color: #FFF;
  position: absolute;
  top: 30px;
  right: 20px;
  z-index: -1;

  box-shadow: 3px 3px 5px rgba(0, 0, 0, .25);

  transition: all .2s ease;

  &.closed {
    width: 0;
    height: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;
  }
`;

export const CartItemsWrapper = styled.div`
  height: 330px;
  overflow-y: scroll;
  font-weight: normal;
  padding-right: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.hasItems ? 'flex-start' : 'center'};
`;

export const Total = styled.p`
  font-size: .8rem;
  font-weight: 400;

  & > strong {
    font-size: 1.3rem;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
`;
