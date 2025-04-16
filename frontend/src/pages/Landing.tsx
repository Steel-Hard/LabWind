import { Header } from "../components";
function Landing() {
  return (
        <>
        <div className="flex-1">

        <Header />
      
        <div className="h-screen w-full">
          <img className="w-full h-full z-0 invisible md:visible sm:invisible" src="./bg-rg.svg"/>
          <img className="z-40 rounded-2xl  absolute w-120 h-120 top-10 md:left-1/6 sm:left-2/4" src="./furnas.png"></img>
          <p className=" text-black absolute text-justify  h-120 w-65 top-45 right-1/6">
          Solução tecnológica para monitoramento climático no Lago de Furnas, oferecendo gráficos interativos e alertas em tempo real, visando reduzir riscos para navegantes e comunidades locais.
          </p>

          <button onClick={() => { window.location.href = "/cadastro"}} className="button absolute w-60 h-20 bottom-30 right-1/6">
            Cadastrar
          </button>

         </div>       
        </div>




      </>
      )
}

      export default Landing;