import Navbar from "../components/Navbar"
import img1 from "../assets/img1.jpg"
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

const translates = {
  title:{
    es:'RECLUTAMIENTO INTELIGENTE',
    en:'RECRUITMENT INTELIGENT',
  },
  description:{
    es:'Optimiza tiempos en el filtro, creación, corrección  y feedback en pruebas técnicas de los candidatos.',
    en:'Optimize time in the filter, creation, correction and feedback in technical tests of candidates.',
  }, 
  button:{
    es:'Te lo enseñamos  🚀',
    en:'We teach you 🚀',
  },
  title1:{
    es:'Evaluación Técnica Inteligente',
    en:'Technical Intelligence Evaluation',
  },
}

const Home = () => {
  const { language } = useContext(GlobalContext);
  return <div className="flex flex-col min-h-screen bg-secondary max-lg:pt-36">
    <Navbar />
    <div className="flex flex-row max-lg:flex-col-reverse justify-center items-center p-8 min-h-screen">
      <div className="flex flex-col flex-1">
        <div className="font-bold text-custom_black text-5xl max-md:text-4xl">
          {translates.title[language as keyof typeof translates.title]}
        </div>
        <div className="text-3xl text-light mt-8">
          {translates.description[language as keyof typeof translates.description]}
        </div>
        <div className='bg-black p-4 rounded-xl text-secondary font-bold hover:scale-110 transition-all duration-200 active:scale-90 w-fit mt-8 cursor-pointer text-2xl'>
          {translates.button[language as keyof typeof translates.button]}
        </div>
      </div>
      <div className=" flex flex-1 justify-end max-lg:justify-center max-lg:my-12">
        <img src={img1} alt="IT Recruitment" className="flex  rounded-2xl w-4/5 max-lg:w-full" />
      </div>
      <div className="border-">

      </div>
    </div>
    <div className='w-full border h-full py-2 bg-primary flex flex-row justify-center items-center'>
      <div className="text-center text-5xl text-custom_black/80 font-bold">
        {translates.title1[language as keyof typeof translates.title1]}
      </div>
    </div>
  </div>
}

export default Home