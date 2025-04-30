import { useState } from "react";
import { TiThMenu } from "react-icons/ti";

export default function Nav() {
  const [showTopNav, setShowTopNav] = useState(false);

  // Função para alternar a visibilidade do menu superior
  const toggleTopNav = () => {
    setShowTopNav(!showTopNav);
  };

  // Obter a URL atual para destacar o link ativo
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Função para verificar se o link é ativo
  const isActive = (path:string) => currentPath === path;

  return (
    <>
      
      {showTopNav && (
        <nav className="top-nav bg-gray-100 p-4 shadow-md fixed top-0 inset-x-0 z-50">
          
          
          <a href="/profile" className="mr-4">Perfil</a>
          <a href="/settings" className="mr-4">Configurações</a>
        </nav>
      )}

      
      <nav className="sidebar-nav flex flex-col xl:flex-row items-center xl:items-start relative z-10">
        <a
          href="/dashboard"
          className={`sidebar-link px-4 py-2 rounded ${
            isActive("/dashboard") ? "shadow-lg bg-blue-100" : ""
          }`}
        >
          GERAL
        </a>
        <a
          href="/tabelas"
          className={`sidebar-link px-4 py-2 rounded ${
            isActive("/tabelas") ? "shadow-lg bg-blue-100" : ""
          }`}
        >
          TABELAS
        </a>
        <a
          href="/graficos"
          className={`sidebar-link px-4 py-2 rounded ${
            isActive("/graficos") ? "shadow-lg bg-blue-100" : ""
          }`}
        >
          GRÁFICOS
        </a>
        <div className="mt-4 xl:mt-0 xl:ml-4 h-3/4">
          <input className="bg-white h-2/4 rounded" type="date" />
        </div>
      </nav>

      
      <div className="flex justify-end p-2 xl:hidden sm:flex">
        <button onClick={toggleTopNav} aria-label="Menu">
          <TiThMenu size={40} />
        </button>
      </div>
    </>
  );
}
