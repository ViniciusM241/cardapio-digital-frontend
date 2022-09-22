import styled from "styled-components";
import colors from "~/utils/colors";
import logo from "~/assets/q2_image.png";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 20px;

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
  padding: 55px 40px 100px 40px;
  border-radius: 20px;
  border: 1px solid ${colors.LIGHT_BLUE};
  background-color: ${colors.WHITE};
`;

export const Logo = styled.img.attrs({
  src: logo,
})`
`;

export const Error = styled.p`
  font-size: .8rem;
  font-weight: 300;
`;
