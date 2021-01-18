import React from 'react';
import styled from 'styled-components';
import background from '../../../assets/backgroundHeader.jpg';

export function Header({ children }) {
  return (
    <Background>
      <Container>
        { children }
      </Container>
    </Background>
  );
}

const Background = styled.div`
  height: 500px;
  width: 100%;
  max-width: 1536px;
  min-width: 275px;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  background: url(${background}) no-repeat 50% 50%;
  background-size: cover;
`;

const Container = styled.header`
  margin-bottom: 25px;
  padding: 25px;
  width: 100%;
  max-width: 980px;
  min-width: 275px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 395px) {
    padding: 15px;
  }
`;
