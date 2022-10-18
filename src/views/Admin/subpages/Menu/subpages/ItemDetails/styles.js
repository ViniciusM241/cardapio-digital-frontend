import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdModeEdit } from 'react-icons/md';
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
  background-image: url('${props => props.src}');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  width: 180px;
  height: 180px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, .25);
`;

export const StyledEditIcon = styled(MdModeEdit)`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px;

  color: #fff;
  font-size: 2.5rem;
  background-color: ${colors.GREEN};
  border-radius: 100%;
  opacity: .8;
`;
