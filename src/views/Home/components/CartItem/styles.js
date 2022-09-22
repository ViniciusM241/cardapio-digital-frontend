import styled from "styled-components";
import colors from "~/utils/colors";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  cursor: pointer;
  transition: all .2s ease;
  padding: 5px 2px;
  border-radius: 2px;

  &:hover {
    background-color: #e3e3e3;
  }
`;

export const StyledImg = styled.div`
  width: 66px;
  height: 66px;

  background-image: url(${props => props.src});
  background-position: center;
  background-size: contain;
  border-radius: 5px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  justify-content: space-around;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  width: 20px;
  height: 20px;
  background-color: ${colors.GREEN};
  padding: 3px;
  border-radius: 5px;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
`;
