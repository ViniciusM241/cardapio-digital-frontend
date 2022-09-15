import styled from "styled-components";
import colors from "~/utils/colors";

export const Container = styled.div`
  padding: 3px 10px;
  border-radius: 5px;

  border: 1px solid ${colors.GREEN};
  color: ${props => props.active ? '#FFF' : colors.SLIDER_TEXT};
  font-size: 1rem;
  font-weight: 400;
  background-color: ${props => props.active ? colors.GREEN : '#FFF'};

  margin-right: 5px;
`;
