import { motion } from "framer-motion";
import { Header } from "../components";
function Landing (){
    return(
        <>
            <Header/>
            <div className="app-container">

      <div className="section section-one">
        <h1>Seção 1</h1>
      </div>

 
      <motion.div
        className="section section-two"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.8 }} // Só anima quando 80% visível
      >
        <h1>Seção 2</h1>
      </motion.div>
    </div>
        </>
    )
}

export default Landing;