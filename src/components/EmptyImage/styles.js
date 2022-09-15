import styled from "styled-components";
import colors from "~/utils/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => props.width ? props.width + 'px' : '65px'};
  height: ${props => props.height ? props.height + 'px' : '65px'};
  border-radius: 5px;

  background-color: ${colors.IMAGE_BG};
`;
