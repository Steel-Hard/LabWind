import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    senha: "",
    role: "USER", // Valor padrão conforme seu modelo
  });
  const [erro, setErro] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Validador que corresponde exatamente ao do backend
  const validateEmail = (email: string) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    // Validação frontend antes de enviar
    if (!formData.name || !formData.email || !formData.senha) {
      setErro("Todos os campos são obrigatórios");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErro(
        "Por favor, insira um email válido (exemplo: usuario@dominio.com)"
      );
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsSubmitting(true);

    try {
      await UserService.signup(
        formData.name,
        formData.email,
        formData.senha,
        formData.role
      );
      setShowConfirmation(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao criar a conta"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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
            name="name"
            placeholder="NOME COMPLETO"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-MAIL"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="SENHA"
            value={formData.senha}
            onChange={handleChange}
            className="input"
            required
            minLength={6}
          />
          {/* Campo role pode ser um select se necessário */}
          <input type="hidden" name="role" value={formData.role} />

          {erro && (
            <p style={{ color: "red" }} className="error">
              {erro}
            </p>
          )}
          {showConfirmation && (
            <div style={{ marginTop: "1rem", color: "white", backgroundColor: "green", padding:"7px", borderRadius: "10px" }}>
              Cadastro realizado com sucesso!
            </div>
          )}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
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
            backgroundColor: "grey",
          }}
          disabled={isSubmitting}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default SignUp;
