import styled from "styled-components";
import colors from "~/utils/colors";

export const StyledButton = styled.button`
  width: 150px;
  padding: 8px;

  color: ${colors.BROWN_TEXT};
  font-weight: 700;
  font-size: 1rem;
  outline: none;

  border-radius: 5px;
  background-color: ${colors.YELLOW};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background-color: ${colors.YELLOW};
    border: 2px solid ${colors.YELLOW};
    color: ${colors.BROWN_TEXT};
  }
`;
