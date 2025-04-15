import { Header } from "../components";
function Landing() {
  return (
        <>
        <div className="flex-1">

        <Header />
      
        <div className="h-screen w-full">

          <h1 className="title relative top-2/4 z-40">LabWind</h1>
          <div className="clouds-container flex overflow-hidden relative w-full h-48">
            <img src="cloud_1.png" className="cloud top-6 right-0 " alt="Cloud 1"/>
            <img src="cloud_2.png" className="cloud  top-10 left-2 " alt="Cloud 2"/>
            <img src="cloud_3.png" className="cloud  bottom-1.5 left-4" alt="Cloud 3"/>
            <img src="cloud_4.png" className="cloud  bottom-8 right-0" alt="Cloud 4"/>
            <img src="cloud_5.png" className="cloud right-0 bottom-5 left-10" alt="Cloud 5"/>
            <img src="cloud_6.png" className="cloud top-20 right-0" alt="Cloud 6"/>
          </div>
        </div>
        <div className="h-screen ">

        </div>        
        </div>




      </>
      )
}

      export default Landing;