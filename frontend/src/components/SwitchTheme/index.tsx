import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

function SwitchTheme() {
    const { theme, setTheme } = useContext(ThemeContext);

    const handlerTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button onClick={handlerTheme}>
            Trocar tema
        </button>
    );
}

export default SwitchTheme;
