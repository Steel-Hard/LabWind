import { Link } from "react-router-dom";

function Header(){
    return(
        <>
        <div className="sidebar bg-transparent">
            <h1>LabWind</h1>
            <div className="flex text-black align-middle justify-center gap-3 text-4xl">

            <Link to={"/login"}>
                Login &raquo;
            </Link>
            </div>
        </div>
        </>
    )
}

export default Header;