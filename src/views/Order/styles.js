import styled from "styled-components";
import { MdKeyboardArrowLeft } from 'react-icons/md';
import colors from "~/utils/colors";

export const StyledMdKeyboardArrowLeft = styled(MdKeyboardArrowLeft)`
  font-size: 2.5rem;
  color: #FFF;
  background-color: ${colors.GREEN};
  border-radius: 100%;
`;

export const Total = styled.p`
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
  font-size: .7rem;
  width: 100%;
`;
