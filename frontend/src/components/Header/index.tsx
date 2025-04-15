import { Link } from "react-router-dom";
import SwitchTheme from "../SwitchTheme";
function Header(){
    return(
        <>
        <div className="sidebar">
            <SwitchTheme/>
            <div className="flex align-middle justify-center gap-3 text-4xl">

            <Link to={"/login"}>
                Login
            </Link>
            |
            <Link to={"/cadastro"}>
                Cadastro
            </Link>
            </div>
        </div>
        </>
    )
}

export default Header;