import styled from 'styled-components';
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
