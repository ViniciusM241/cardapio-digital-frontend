import React from 'react';
import { StyledSelect, StyledLabel, StyledError, StyledOption } from './styles';

function TextArea({
  label,
  items=[],
  values,
  onChange,
  ...props
}) {

  const handleOnChange = (e) => {
    if (onChange) onChange(e, state => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div className={props.className} style={{width: '100%'}}>
      <StyledLabel htmlFor={props.name}>
        {label}
        <StyledSelect
          name={props.name}
          value={+values[props.name]}
          onChange={handleOnChange}
          {...props}
        >
          <StyledOption value=''>
            Selecione uma categoria
          </StyledOption>
          {
            items.map(item => (
              <StyledOption
                key={item.id}
                value={item.id}
                // selected={item.id === +values[props.name]}
              >
                {item.name}
              </StyledOption>
            ))
          }
        </StyledSelect>
      </StyledLabel>
      {
        props.error && !props.disabled && (
          <StyledError>
            {props.error}
          </StyledError>
        )
      }
    </div>
  );
}

export default TextArea;
