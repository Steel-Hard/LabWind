import React, { useState } from 'react';
import UserService from '../services/UserService';


const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [name, setName] = useState('');


  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await UserService.signup(name,email,senha);
      console.log(res)

    } catch (error) {
      console.log(error);
      
    }
 
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="form">
        <input
            type="name"
            placeholder="NOME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="E-MAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="SENHA"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Cadastro
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
