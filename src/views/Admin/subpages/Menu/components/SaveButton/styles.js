import styled from 'styled-components';
import { MdSave } from 'react-icons/md';
import colors from '~/utils/colors';

export const Container = styled.button`
  width: 60px;
  height: 60px;
  background-color: #FFF;
  border: none;
  outline: none;
  color: ${colors.TEXT};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 30px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .25);

  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`;

export const Ico = styled(MdSave)`
  font-size: 2.5rem;
`;
