import styled from 'styled-components';
import colors from '~/utils/colors';

export const Item = styled.div`
  background-color: ${props => props.active ? colors.GREEN : '#FFF'};
  width: 100%;
  padding: 10px;
  border-bottom: 3px solid ${colors.GREEN};

  font-size: 1.3rem;
  font-weight: 400;
  text-align: center;
  color: ${props => props.active ? '#FFF' : colors.TEXT};
  cursor: pointer;

  transition: all .2s ease;
`;
