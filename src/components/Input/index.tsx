import React, { InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...props }) => {
  const inputRef = React.useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {error}
      <input ref={inputRef} defaultValue={defaultValue} {...props} />
    </Container>
  );
};

export default Input;
