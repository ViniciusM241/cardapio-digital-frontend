import styled from "styled-components";
import colors from "~/utils/colors";

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
  z-index: 50;
`;

export const CartWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: #FFF;
  border-radius: 30px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -10px;

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
    font-weight: bold;
    font-size: 1.3rem;
  }
`;

export const CartItemWrapper = styled.div`
  width: 300px;
  height: 200px;
  padding: 10px;
  border-radius: 20px;
  border-top-right-radius: 0;
  border: 1px solid #dfdfdf;

  background-color: #FFF;
  position: absolute;
  top: 90px;
  right: 300px;
`;
