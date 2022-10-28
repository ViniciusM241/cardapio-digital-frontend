import styled from 'styled-components';
import { P } from '~/components';

export const StyledImg = styled.div`
  width: 100px;
  height: 100px;

  background-image: url('${props => props.src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LimitedP = styled(P)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
          line-clamp: 2;
  -webkit-box-orient: vertical;
`;
