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


      <div className="relative hidden xl:block h-screen w-full overflow-hidden">
        <img
          className="w-full h-full  z-0"
          src="./background.svg"
          alt="Background"
        />
        

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-full h-full flex">

            <div className="w-1/2 flex items-center justify-center">
              <img
                className="z-40 rounded-2xl w-auto h-auto  max-h-[80vh] max-w-[80%]"
                src="./furnas.png"
                alt="Lago de Furnas"
              />
            </div>
            
           
            <div className="w-1/2 flex flex-col items-center justify-center">
              <div className="w-[80%] max-w-lg">
                <p className="roboto-medium text-center text-4xl mb-10 text-black">
                  Solução tecnológica para monitoramento climático no Lago de
                  Furnas, oferecendo gráficos interativos e alertas em tempo real,
                  visando reduzir riscos para navegantes e comunidades locais.
                </p>
                
                <button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                  className="jomhuria-regular w-full h-20 bg-[var(--color-primary)] hover:bg-blue-950 text-white p-3 rounded-md text-6xl cursor-pointer transition-colors duration-200 mt-4"
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>
        
   
        <a
      href="https://www.github.com/steel-hard"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="absolute bottom-4 left-10 max-h-16 w-auto cursor-pointer"
        src="/SH.png"
        alt="Logo"
      />
    </a>
      </div>
      
      
      {/*  mobile */}
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
          className="jomhuria-regular w-[45%] h-20 bg-blue-400 hover:bg-blue-950 text-white p-3 rounded-md text-6xl cursor-pointer transition-colors duration-200 shadow sm:w-[45%]"
        >
          Acessar
        </button>
        
        <img
          className="rounded-2xl w-[50%] h-auto"
          src="./furnas.png"
          alt="Furnas"
        />

<a
      href="https://www.github.com/steel-hard"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="bottom-4 max-h-16 w-auto cursor-pointer"
        src="/SH.png"
        alt="Logo"
      />
    </a>
      </div>


      </div>
    </>
  );
}

export default Landing;
