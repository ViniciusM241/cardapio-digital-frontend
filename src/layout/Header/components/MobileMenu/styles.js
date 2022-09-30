import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;

  &.closed {
    display: none;
  }
`;

export const MenuContainer = styled.div`
  width: 90vw;
  height: 100vh;
  background-color: #FFF;
  border-top-right-radius: 20px;
  padding: 20px 20px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;

  transition: all .3s ease;

  &.closed {
    left: -90vh;
  }
`;
