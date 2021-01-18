import React from 'react';
import styled from 'styled-components';
import notFound from '../../../assets/notFound.gif';

export function NotFoundPage() {
  return (
    <Img src={notFound} alt="" />

  );
}

// const Container = styled.div`
//   position: relative;
//   width: 100vw;
//   height: 100vh;
//   background: #E1E3E2;
//   padding: 10vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

const Img = styled.img`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;
