import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from "../../services/api";
import { useLabwind } from "../../contexts/labwindContext";
import { exportJsonToXlsx } from "../../utils/jsonToXlsx";
import { converteDate } from "../../utils/data";
import { useState } from "react";
import PopUp from "../PopUp";  // ajuste o caminho conforme seu projeto
import { Link } from "react-router-dom";

export default function Download() {
  const { data, date, station } = useLabwind();

  const [alertContent, setAlertContent] = useState<React.ReactNode | null>(null);

  const closeAlert = () => setAlertContent(null);

  const handleDownload = () => {
    exportJsonToXlsx(data, `${station}_${converteDate(date)}`);
  };

  const validateToken = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        await api.post("/token", {}, { headers: { Authorization: `Bearer ${token}` } });
        handleDownload();
      } catch {
        setAlertContent(<p>Token inválido.</p>);
      }
    } else {
      setAlertContent(
        <p>
          Você deve realizar o login, clique{" "}
          <Link to="/login" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">
            aqui
          </Link>
          .
        </p>
      );
    }
  };

  return (
    <>
      <button
      title="download dados"
        onClick={validateToken}
        className="z-40 fixed bottom-5 right-5 bg-green-400 hover:cursor-pointer h-10 w-10 rounded-full flex justify-center items-center"
        aria-label="Download"
      >
        <FontAwesomeIcon color="black" icon={faDownload} />
      </button>

      {alertContent && (
            <PopUp title="Aviso" onClose={closeAlert}>
          {alertContent}
        </PopUp>
      )}
    </>
  );
}
