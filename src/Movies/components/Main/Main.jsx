import React from 'react';
import styled from 'styled-components';

export function Main({ children }) {
  return (
    <Container>
      <MoviesContainer>
        { children }
      </MoviesContainer>
    </Container>
  );
}

const Container = styled.main`
  padding: 25px;
  min-width: 275px;
  max-width: 1442px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #121413;

  @media screen and (max-width: 395px) {
    padding: 15px;
  }
`;

const MoviesContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
