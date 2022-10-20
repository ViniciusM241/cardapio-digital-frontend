import styled from "styled-components";
import colors from "~/utils/colors";

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 8px;
  border: 3px solid ${props => props.active ? colors.GREEN : colors.GRAY};

  width: 32px;
  height: 32px;
  padding: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;

  background-color: ${props => props.active ? colors.GREEN : 'transparent'};
  color: ${props => props.active ? '#FFF' : colors.TEXT};
  transition: all .2s ease;

  &:hover {
    background-color: ${colors.GREEN};
    color: ${colors.WHITE};
    border-color: ${colors.GREEN};
  }
`;
