import styled from 'styled-components';
import colors from '~/utils/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  ${({styled}) => styled && 'position: relative;'}
`;

export const StyledLabel = styled.label`
  width: 100%;
`;

export const StyledInput = styled.input`
  border: 0;
  padding: 5px 0;

  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;

  width: 1rem;
  height: 1rem;
  border: 2px solid #6A6A6A;
  border-radius: .2rem;
  display: grid;
  place-content: center;
  transform: translateY(-1px);

  font-size: 1rem;
  color: #000;

  ${({styled}) => (
    styled &&
    `
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: none;
      background-color: #EFEFEF;
      cursor: pointer;
      transition: all .2s ease;

      &:checked + label {
        color: #FFF;
      }
    `
  )}

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    width: .5rem;
    height: .5rem;
    display: block;
    border-radius: .1rem;
    background-color: ${colors.GREEN};
    transform: scale(0);
    transition: transform .1s ease;

    ${({styled}) => (
      styled &&
        `
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: #3CA6BC;
          cursor: pointer;
        `
    )}
  }

  &:checked {
    border-color: ${colors.GREEN};
  }

  &:checked::after {
    transform: scale(1);
  }
`;
