import styled from "styled-components";
import { P } from '~/components';

export const Wrapper = styled.div`

`;

export const StyledP = styled(P)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
          line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const StyledImg = styled.div`
  width: 66px;
  height: 66px;

  background-image: url(${props => props.src});
  background-position: center;
  background-size: contain;
  border-radius: 5px;
`;
