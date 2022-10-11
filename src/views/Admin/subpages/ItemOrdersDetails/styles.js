import styled from "styled-components";
import { MdKeyboardArrowLeft } from 'react-icons/md';
import colors from "~/utils/colors";

export const StyledMdKeyboardArrowLeft = styled(MdKeyboardArrowLeft)`
  font-size: 2.5rem;
  color: #FFF;
  background-color: ${colors.GREEN};
  border-radius: 100%;

  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background-color: #FFF;
    border: 1px solid ${colors.GREEN};
    color: ${colors.TEXT};
  }
`;

export const StyledImg = styled.div`
  background-image: ${props => props.src};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  width: 120px;
  height: 120px;
  border-radius: 5px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;

  flex-direction: column;
  justify-content: space-between;
`;

export const Total = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px;
  border: 1px solid ${colors.YELLOW};
  border-radius: 2px;
`;

export const ActionButton = styled.button`
  outline: none;
  border: none;
  width: 20px;
  height: 20px;
  background-color: ${colors.YELLOW};
  padding: 3px;
  border-radius: 5px;
  color: #FFF;
  font-weight: bold;

  cursor: pointer;
`;
