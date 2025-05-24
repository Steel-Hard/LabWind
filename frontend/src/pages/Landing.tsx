import { Link } from "react-router-dom";
import { Header } from "../components";
function Landing() {
  return (
    <>
      <div className="flex-1">
        <Header isTransparent={true}>
          <h1 className="jomhuria-regular text-8xl text-shadow-lg/100 ml-10">
            LabWind
          </h1>
          <div className="block align-bottom text-white xl:text-black gap-3 text-4xl mt-3 mr-10">
            <Link to={"/login"}>Login &raquo;</Link>
          </div>
        </Header>

        <div className="relative hidden xl:block h-screen w-full">
          <img
            className="w-full h-full z-0 invisible xl:visible"
            src="./background.svg"
          />

          <img
            className="z-40 rounded-2xl  absolute top-20 xl:size-120 md:size-120"
            src="./furnas.png"
          />

          <div>
            <p className="roboto-medium absolute text-center text-2xl h-1/3 w-[35%] top-60 right-1/8 text-black">
              Solução tecnológica para monitoramento climático no Lago de
              Furnas, oferecendo gráficos interativos e alertas em tempo real,
              visando reduzir riscos para navegantes e comunidades locais.
            </p>

            <button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="jomhuria-regular absolute button-cadastrar"
            >
              Acessar
            </button>
          </div>
          <img className="absolute inset-x-0 xl:bottom-0 ml-10" src="/SH.png" />
        </div>

        <div className="flex flex-col items-center text-center px-6 py-10 gap-6 xl:hidden">
          <p className="roboto-medium lg:text-3xl text-2xl h-1/3 w-[70%] mt-20">
            Solução tecnológica para monitoramento climático no Lago de Furnas,
            oferecendo gráficos interativos e alertas em tempo real, visando
            reduzir riscos para navegantes e comunidades locais.
          </p>

          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="jomhuria-regular button-cadastrar shadow"
          >
            Acessar
          </button>

          <img
            className="rounded-2xl w-[50%] h-auto"
            src="./furnas.png"
            alt="Furnas"
          />

          <img
            src="/SH.png"
            alt="Logo"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open("https://github.com/steel-hard", "_blank")
            }
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
