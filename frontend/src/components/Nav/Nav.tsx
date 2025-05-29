import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [showTopNav, setShowTopNav] = useState(false);
  const location = useLocation();

  const toggleTopNav = () => setShowTopNav((prev) => !prev);

  const navLinks = [
    { to: "/dashboard", label: "GERAL" },
    { to: "/tabelas", label: "TABELAS" },
    { to: "/graficos", label: "GRÁFICOS" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {showTopNav && (
        <nav className="top-nav flex flex-col h-full bg-white p-4 shadow-md fixed w-2/4 opacity-90 top-0 inset-x-0 z-80">
          <button
            className="font-bold text-5xl text-gray-700 hover:text-red-600 transition-colors duration-300 mb-6 ml-auto p-2"
            onClick={toggleTopNav}
            aria-label="Fechar menu"
          >
            ×
          </button>

          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              className="block mb-4 px-4 py-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 text-gray-800 font-medium"
              to={to}
              onClick={toggleTopNav}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      <nav className="sidebar-nav flex flex-col xl:flex-row items-center xl:items-start relative z-10 p-2">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`sidebar-link px-4 py-2 rounded ${
              isActive(to) ? "shadow-lg bg-[var(--color-secondary)]" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {!showTopNav && (
        <div className="flex justify-end p-2 xl:hidden sm:flex">
          <button onClick={toggleTopNav} aria-label="Menu">
            <FontAwesomeIcon size={"2xl"} icon={faBars} />
          </button>
        </div>
      )}
    </>
  );
}
