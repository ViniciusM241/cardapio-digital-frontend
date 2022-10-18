import styled from "styled-components";
import colors from "~/utils/colors";

export const Tr = styled.tr`
  cursor: pointer;
  transition: background-color .2s ease;

  &:hover {
    background-color: ${colors.GRAY};
  }
`;

export const Td = styled.td`
  font-weight: 500;
  padding: 16px 35px;
`;
