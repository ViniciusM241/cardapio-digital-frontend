import styled from "styled-components";
import colors from "~/utils/colors";

export const StyledInput = styled.textarea`
  display: inline-flex;
  padding: 15px 7px;
  width: 100%;
  margin-top: 5px;
  min-height: 100px;
  resize: vertical;

  background-color: ${colors.LIGHT_GRAY};
  border-radius: 5px;
  border: 1px solid #DFDFDF;
  outline: none;
  font-family: 'Roboto', sans-serif;
`;

export const StyledLabel = styled.label`
  width: 100%;
  font-weight: 400;
`;

export const StyledError = styled.span`
  color: ${colors.RED};
  font-size: 1rem;
  width: 100%;
`;
