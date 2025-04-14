import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import { ThemeConsumer } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #5EBFBF;
  padding: 20px;
`;

const SignUpBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  img {
    height: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  color: black;
  &:focus {
    outline: none;
    border-color: #5EBFBF;
  }
`;

const Button = styled.button`
  background-color: #5EBFBF;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4ea8a8;
  }
`;

const SignUp: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui futuramente vai a lógica de cadastro na API
    console.log({ nome, email, senha });
    
    UserService.signup (nome,email,senha).then((res)=>{
    console.log (res)

    const token =  
    UserService.signin(email,senha)
    console.log(token)
    })

  };

  return (
    <Container>
      <SignUpBox>
        <Logo>
          <img src="/logo.png" alt="Logo" />
        </Logo>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="NOME"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-MAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="SENHA"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </SignUpBox>
    </Container>
  );
};

export default SignUp;
