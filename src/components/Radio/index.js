import React from 'react';
import { Container, StyledInput, StyledLabel } from './styles';

function RadioInput ({ label, onChange, values, styled, ...props }) {

  const handleOnChange = (e) => {
    if (onChange) onChange(e, state => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <Container styled={styled}>
      <StyledInput
        {...props}
        type="radio"
        name={props?.name}
        id={props.value}
        checked={values?.[props.name] === props.value}
        onChange={handleOnChange}
        styled={styled}
      />
      <StyledLabel htmlFor={props?.value} styled={styled}>
        {label}
      </StyledLabel>
    </Container>
  );
}

export default RadioInput;
