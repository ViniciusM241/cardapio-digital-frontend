import styled from "styled-components";
import colors from "~/utils/colors";

export const Wrapper = styled.div`
  width: 100%;
  height: 50%;
  align-self: center;
  display: flex;

  position: relative;

  &::after {
    content: '';
    height: 5px;
    width: 100%;
    background-color: ${colors.GREEN};
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    position: absolute;
    bottom: 0;
  }
`;

export const Collapse = styled.div`
  width: 150px;
  background-color: #FFF;
  border-radius: 5px;
  box-shadow: 2px 1px 5px 0px rgba(0, 0, 0, .25);
  position: absolute;
  top: 70%;
  right: 0;
  z-index: 10;
`;

export const CollapseItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, .25);
  transition: all .2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, .25);
  }
`;

export const Item = styled.h2`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding-bottom: 10px;
  cursor: pointer;
`;
