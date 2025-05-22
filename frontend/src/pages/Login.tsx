import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://seu-backend.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErro(data.message || "Erro ao fazer login");
        return;
      }

      const data = await response.json();
      const token = data.token;

      sessionStorage.setItem("token", token);
      navigate("/dashboard");
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
          {erro && <div style={{color:"black"}} className="error-message">{erro}</div>}
          <button type="submit" className="button">
            Entrar
          </button>
          <span style={{ color: "black" }}>
            Não tem cadastro?{" "}
            <a onClick={handleCadastroClick} style={{ cursor: "pointer", textDecoration: "underline", fontSize:"15px" }}>
              Clique aqui.
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
