import React from 'react';
import styled from 'styled-components';

export function Button({
  children, onClick, active, ...restProps
}) {
  return (
    <StyledButton
      onClick={onClick}
      active={active}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 5px 10px;
  color: #4A4A4A;
  text-transform: uppercase;
  background:#121413;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .3s ease-in-out;

  ${(props) => (props.active ? `
    background-color:#830d0d;
    color: white;
  ` : '')}
`;
