import React, { FormEvent } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import api from '../../services/api';

import logo from '../../assets/gs3-tec.png';
import { Container, Content, Background } from './style';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import { useAuth } from '../../context/auth';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  username: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const { username, signIn } = useAuth();

  const handleSubmit = React.useCallback(
    async (data: SignInFormData) => {
      try {
        signIn({
          username: data.username,
          password: data.password,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [signIn],
  );

  return (
    <>
      <Container>
        <Content>
          <Form onSubmit={handleSubmit}>
            <img src={logo} alt="GS3 Tecnologia" />
            <h1>Fazer Login</h1>
            <Input
              type="text"
              placeholder="Nome de usuário"
              name="username"
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              required
            />
            <Button type="submit">Entrar</Button>
          </Form>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Dashboard;
