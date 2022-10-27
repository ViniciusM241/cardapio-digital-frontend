import styled from 'styled-components';

export const Wrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;

cursor: pointer;
transition: all .2s ease;
padding: 5px 2px;
border-radius: 2px;

&:hover {
  background-color: #e3e3e3;
}
`;

export const StyledImg = styled.div`
width: 66px;
height: 66px;

background-image: url(${props => props.src});
background-position: center;
background-size: cover;
border-radius: 5px;
`;

export const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100%;

justify-content: space-around;
`;
