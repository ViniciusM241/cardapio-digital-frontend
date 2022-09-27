import styled from 'styled-components';
import colors from '~/utils/colors';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;

  transition: all .2s ease;

  &:hover {
    background-color: ${colors.GRAY};
  }
`;
