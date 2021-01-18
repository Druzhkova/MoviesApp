import React, { useCallback } from 'react';
import styled from 'styled-components';

export function Input({ onChangeText, value, ...restProps }) {
  const onChange = useCallback((event) => {
    onChangeText(event.target.value);
  }, [onChangeText]);

  return <StyledInput onChange={onChange} value={value} {...restProps} />;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 45px 10px 15px;
  font-size: 16px;
  color: #4A4A4A;
  background: #2a2a2a61;
  border: none;
  border-bottom: 1px solid #4A4A4A;
  outline: none;
`;
