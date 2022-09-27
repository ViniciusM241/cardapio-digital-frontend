import styled from 'styled-components';
import { MdMenu } from "react-icons/md";
import colors from '~/utils/colors';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 80px;
`;

export const StyledMdMenu = styled(MdMenu)`
  font-size: 2rem;
  color: #fff;
  background-color: ${colors.GREEN};
  padding: 5px;
  border-radius: 50%;
`;
