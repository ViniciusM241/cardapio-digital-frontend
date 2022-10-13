import styled from 'styled-components';
import colors from '~/utils/colors';

export const Delete = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${colors.RED};

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const Edit = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${colors.GREEN};

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
