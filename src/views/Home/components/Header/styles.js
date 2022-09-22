import styled from "styled-components";

export const StyledImage = styled.img`
  width: 100%;
  max-width: 115px;
`;

export const Wrapper = styled.header`
  padding-top: 20px;
  display: flex;
  ${
    props => props.xs ?
      `
        z-index: -1;
        position: sticky;
      `
    :
      `
        z-index: 30;
        position: relative;
      `
  }
  top: 0;
`;
