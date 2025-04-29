import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por enquanto, vamos apenas redirecionar para o dashboard
    // A lógica de autenticação será implementada posteriormente
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo">
          <img src="/SHlogo-preto.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="form">
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
