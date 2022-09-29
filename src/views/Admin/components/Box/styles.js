import styled from "styled-components";
import colors from "~/utils/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 200px;
  border-radius: 10px;
  background-color: #FFF;

  border: 1px solid ${colors.GRAY};
  padding: 10px;
`;

export const Content = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
