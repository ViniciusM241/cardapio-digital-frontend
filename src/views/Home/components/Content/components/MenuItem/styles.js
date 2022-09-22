import styled from "styled-components";
import { P } from '~/components';
import colors from "~/utils/colors";

export const Wrapper = styled.div`
  cursor: pointer;
  padding: 5px 1px;
  border-radius: 2px;

  transition: all .2s ease;

  &:hover {
    background-color: ${colors.GRAY}
  }
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
