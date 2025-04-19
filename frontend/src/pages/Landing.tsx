import { Header } from "../components";
function Landing() {
  return (
    <>
      <div className="flex-1">
        <Header />

        <div className="relative hidden xl:block h-screen w-full">
          <img
            className="w-full h-full z-0 invisible xl:visible"
            src="./background.svg"
          />

          <img
            className="z-40 rounded-2xl absolute top-20 xl:size-165"
            src="./furnas.png"
          />

          <div>
            <p className="roboto-medium absolute text-center text-4xl h-1/3 w-[35%] top-60 right-1/8 text-black">
              Solução tecnológica para monitoramento climático no Lago de
              Furnas, oferecendo gráficos interativos e alertas em tempo real,
              visando reduzir riscos para navegantes e comunidades locais.
            </p>

            <button
              onClick={() => {
                window.location.href = "/cadastro";
              }}
              className="jomhuria-regular absolute button-cadastrar"
            >
              Cadastrar
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
              window.location.href = "/cadastro";
            }}
            className="jomhuria-regular button-cadastrar shadow"
          >
            Cadastrar
          </button>

          <img
            className="rounded-2xl w-[50%] h-auto"
            src="./furnas.png"
            alt="Furnas"
          />

          <img src="/SH.png" alt="Logo" />
        </div>
      </div>
    </>
  );
}

export default Landing;
