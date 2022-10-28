import styled from "styled-components";
import colors from "~/utils/colors";

export const ColoredStatus = styled.span`
  padding: 5px;
  color: #fff;
  border-radius: 2px;

  background-color: ${props => props.online ? colors.GREEN : colors.RED};
`;

export const Link = styled.span`
  color: ${colors.TEXT};
  text-decoration: underline;
  cursor: pointer;
`;
