import styled from "styled-components";
import { MdKeyboardArrowLeft } from 'react-icons/md';
import colors from "~/utils/colors";
import { P } from '~/components';

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

export const Total = styled.p`
  font-weight: normal;

  & > strong {
    font-size: 1.8rem;
  }
`;

export const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


export const StyledError = styled.span`
  color: ${colors.RED};
  font-size: 1rem;
  width: 100%;
`;

export const StyledPix = styled(P)`
  line-break: anywhere;

  span {
    padding: 5px;
    border-radius: 2px;

    background-color: ${colors.GRAY};
  }
`;
