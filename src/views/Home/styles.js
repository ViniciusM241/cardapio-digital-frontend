import styled from "styled-components";
import image from '~/assets/bckg.svg';

export const StyledBackground = styled.div`
  height: 100%;

  &::before {
    content: ' ';
    display: block;

    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;

    width: 100%;
    height: 80vh;

    opacity: .2;
    background-image: url(${image});
    background-attachment: fixed;
  }
`;

