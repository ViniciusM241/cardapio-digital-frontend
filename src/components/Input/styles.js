import styled from "styled-components";
import colors from "~/utils/colors";

export const StyledInput = styled.input`
  display: inline-flex;
  padding: 15px 7px;
  width: 100%;
  margin-top: 5px;

  background-color: ${colors.LIGHT_GRAY};
  border-radius: 5px;
  border: 1px solid #DFDFDF;
  outline: none;
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
