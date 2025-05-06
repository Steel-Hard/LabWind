import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [showTopNav, setShowTopNav] = useState(false);
  const location = useLocation();

  const toggleTopNav = () => setShowTopNav(prev => !prev);

  const navLinks = [
    { to: "/dashboard", label: "GERAL" },
    { to: "/tabelas", label: "TABELAS" },
    { to: "/graficos", label: "GRÁFICOS" },
  ];

  const isActive = (path:string) => location.pathname === path;

  return (
    <>
      {/* Menu Superior (Overlay) */}
      {showTopNav && (
        <nav className="top-nav flex flex-col h-full bg-white p-4 shadow-md fixed w-2/4 opacity-90 top-0 inset-x-0 z-80">
          <button
            className="font-bold text-9xl text-black mb-4"
            onClick={toggleTopNav}
            aria-label="Fechar menu"
          >
            X
          </button>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              className="sidebar-link mb-2 text-black"
              to={to}
              onClick={toggleTopNav}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      {/* Navegação Sidebar */}
      <nav className="sidebar-nav flex flex-col xl:flex-row items-center xl:items-start relative z-10 p-2">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`sidebar-link px-4 py-2 rounded ${
              isActive(to) ? "shadow-lg bg-blue-500" : ""
            }`}
          >
            {label}
          </Link>
        ))}

        {/* Input de Data */}
        <div className="mt-4 xl:mt-0 xl:ml-4 h-3/4 sm:h-auto">
          <input className="bg-white h-2/4 rounded" type="date" />
        </div>
      </nav>

      {/* Botão do Menu para telas menores */}
      {!showTopNav && (
        <div className="flex justify-end p-2 xl:hidden sm:flex">
          <button onClick={toggleTopNav} aria-label="Menu">
            <TiThMenu size={40} />
          </button>
        </div>
      )}
    </>
  );
}
