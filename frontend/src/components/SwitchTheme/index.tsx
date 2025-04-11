
import { useEffect, useState } from "react"

function SwitchTheme() {

    const [theme,setTheme] = useState('dark');
    const [act, setAct] = useState(false);

    useEffect(() => {
        // if (theme === 'dark') {
        //     document.body.setAttribute('data-theme', 'dark');
        //     document.documentElement.style.setProperty('--color-primary', '#0C2E3F');
        //     document.documentElement.style.setProperty('--color-secondary', '#1C4157');
        //   } else {
        //     document.body.setAttribute('data-theme', 'light');
        //     document.documentElement.style.setProperty('--color-primary', '#51ADCD');
        //     document.documentElement.style.setProperty('--color-secondary', '#7CC3D2');
        //   }
        // document.body.classList.remove('light', 'dark')
        localStorage.setItem("theme", theme);
        document.body.classList.add(theme);        
    }, [theme])

    const handlerTheme = () => {
        setAct(!act);
        setTheme( act ?  'dark':'light');
    }


    return(
        <>
            <button onClick={handlerTheme}>
                trocar tema
            </button>
        </>
    )

}

export default SwitchTheme;