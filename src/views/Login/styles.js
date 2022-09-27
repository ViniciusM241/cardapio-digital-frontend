import styled from "styled-components";
import colors from "~/utils/colors";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  min-width: ${({breakpoints}) => {
    if (breakpoints.xs)
      return '150px'
    else
      return '480px'
  }};

  max-width: 500px;
  width: 90vw;

  padding: 55px 40px 100px 40px;
  border-radius: 20px;
  border: 1px solid ${colors.LIGHT_BLUE};
  background-color: ${colors.WHITE};
`;

export const Error = styled.p`
  font-size: .8rem;
  font-weight: 300;
`;
