/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";

interface ITheme {
    theme: string;
    setTheme: (value: string) => void;
}

const ThemeContext = createContext({} as ITheme);

function ThemeProvider({ children }: any) {
    const [theme, setTheme] = useState<string>(() => {
        const localTheme = localStorage.getItem("theme");
        return localTheme || "dark";
    });


    useEffect(() => {
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            document.body.setAttribute("data-theme", "dark");
            document.documentElement.style.setProperty("--color-primary", "#10243A");
            document.documentElement.style.setProperty("--color-secondary", "#1C4157");
        } else {
            document.body.setAttribute("data-theme", "light");
            document.documentElement.style.setProperty("--color-primary", "#51ADCD");
            document.documentElement.style.setProperty("--color-secondary", "#7CC3D2");
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };
