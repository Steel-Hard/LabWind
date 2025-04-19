import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="sidebar bg-transparent">
        <h1 className="jomhuria-regular text-8xl text-shadow-lg/100 ml-10">
          LabWind
        </h1>
        <div className="block align-bottom text-white xl:text-black gap-3 text-4xl mt-3 mr-10">
          <Link to={"/login"}>Login &raquo;</Link>
        </div>
      </header>
    </>
  );
}

export default Header;
