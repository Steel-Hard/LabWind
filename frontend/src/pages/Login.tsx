import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await UserService.signin(email, senha);

      if (typeof data === "object" && data !== null && "token" in data) {
        const token = (data as { token: string }).token;
        sessionStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setErro("Resposta inesperada do servidor.");
      }
    } catch (err) {
      setErro(`Erro na comunicação com o servidor. Tente novamente. ${err}`);
    }
  };

  const handleCadastroClick = () => {
    navigate("/cadastro");
  };

  return (
    <div className="container">
      <div className="login-box">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
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
          {erro && (
            <div style={{ color: "black" }} className="error-message">
              {erro}
            </div>
          )}
          <button type="submit" className="button">
            Entrar
          </button>
          <span style={{ color: "black" }}>
            Não tem cadastro?{" "}
            <a
              onClick={handleCadastroClick}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "15px",
              }}
            >
              Clique aqui.
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
