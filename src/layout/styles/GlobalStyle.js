import { createGlobalStyle } from "styled-components";
import colors from "~/utils/colors";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }

  body, html {
    min-height: 100vh;
    font-weight: 600;
    font-size: .9rem;
    color: ${colors.TEXT};
    font-family: 'Roboto', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.GREEN};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.GREEN};
  }

  .mt-10 {
    margin-top: 10px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mt-40 {
    margin-top: 40px;
  }

  .mb-40 {
    margin-bottom: 40px;
  }

  .ml-10 {
    margin-left: 10px;
  }

  .mr-10 {
    margin-right: 10px;
  }

  .ml-20 {
    margin-left: 20px;
  }

  .mr-20 {
    margin-right: 20px;
  }
`;

export default GlobalStyle;
