import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`

`;

export const DatePickerStyles = createGlobalStyle`
  .react-datepicker-wrapper {
    width: initial !important;
  }

  .react-datepicker__input-container {
    input {
      text-align: right;
      border: none;
      outline: none;
    }
  }
`;

