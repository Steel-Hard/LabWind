import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await UserService.signup(name, email, senha);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior no histórico
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo">
          <img src="/SHlogo-preto.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
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
            Cadastrar
          </button>
        </form>
        <button
  type="button"
  className="button"
  onClick={handleBack}
  style={{
    marginTop: "10px",
    cursor: "pointer",
    width: "100%",
    padding: "10px",
    backgroundColor:"grey"
  }}
>
  Voltar
</button>

      </div>
    </div>
  );
};

export default SignUp;
