import React from 'react';
import { Container, StyledInput, StyledLabel } from './styles';

function CheckBox ({ label, onChange, values, styled, ...props }) {

  const handleOnChange = (e) => {
    if (onChange) {
      let newValue = values?.[props.name];

      if (values?.[props.name].includes(props.value)) {
        newValue = values[props.name].filter(x => x != props.value);
      } else {
        newValue = [...values[props.name], parseInt(e.target.value)];
      }

      onChange(e, state => ({ ...state, [e.target.name]: newValue }));
    }
  };

  return (
    <Container styled={styled}>
      <StyledInput
        {...props}
        type="checkbox"
        name={props?.name}
        id={props.value}
        checked={values?.[props.name].includes(props.value)}
        onChange={handleOnChange}
        styled={styled}
      />
      <StyledLabel htmlFor={props?.value} styled={styled}>
        {label}
      </StyledLabel>
    </Container>
  );
}

export default CheckBox;
