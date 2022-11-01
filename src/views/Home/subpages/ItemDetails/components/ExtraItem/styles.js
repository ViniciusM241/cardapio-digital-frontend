import styled from 'styled-components';
import colors from '~/utils/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  cursor: pointer;
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
  line-height: 1;

  cursor: pointer;
`;
