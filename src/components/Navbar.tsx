import { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { GlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';


const traslates = {
  login: {
    es: 'Entrar',
    en: 'Login',
  },
  register: {
    es: 'Registrarce',
    en: 'Register',
  },
  button: {
    es: 'Te lo enseñamos  🚀',
    en: 'We teach you 🚀',
  }
}

const Navbar = () => {

  const [theme, setTheme] = useState<boolean>(false);
  const { language, setLanguage } = useContext(GlobalContext);

  const move = useNavigate();

  const toggleTheme = () => {
    setTheme((prev) => !prev);
  }

  return <div className="fixed top-0 z-10 w-full h-fit bg-white select-none">
    <div className="w-full h-full bg-primary/50 py-4 px-8 shadow-md flex flex-row items-center ">
      <div className=" flex flex-1 flex-row justify-start items-center gap-2">
        <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
        <div className='text-4xl font-extrabold text-light max-md:hidden'>
          SPARRING
        </div>
      </div>
      <div className="flex flex-1 flex-row justify-end gap-4 text-2xl h-fit items-center text-light flex-nowrap">
        <div className='flex flex-row items-center gap-2 cursor-pointer  hover:scale-110 transition-all duration-200 active:scale-90 hover:text-custom_black' onClick={() => move('/auth/login')}>
          <i className='pi pi-sign-in text-2xl'></i>
          <div className='max-md:hidden'>
            {traslates.login[language as keyof typeof traslates.login]}
          </div>
        </div>
        <div className='flex flex-row items-center gap-2 cursor-pointer  hover:scale-110 transition-all duration-200 active:scale-90 hover:text-custom_black' onClick={() => move('/auth/register')}>
          <i className='pi pi-user-plus text-2xl'></i>
          <div className='max-md:hidden'>
            {traslates.register[language as keyof typeof traslates.register]}
          </div>
        </div>
        <div className='flex gap-2'>
          <div className={`flex flex-row items-center gap-2 cursor-pointer  hover:scale-110 transition-all duration-200 active:scale-90 hover:text-custom_black ${language === 'es' ? 'text-custom_black' : ''}`} onClick={() => setLanguage('es')}>
            ES
          </div>
          <div className={`flex flex-row items-center gap-2 cursor-pointer  hover:scale-110 transition-all duration-200 active:scale-90 hover:text-custom_black ${language === 'en' ? 'text-custom_black' : ''}`} onClick={() => setLanguage('en')}>
            ENG
          </div>
        </div>
        <div onClick={toggleTheme} className='flex flex-row items-center gap-2 cursor-pointer  hover:scale-110 transition-all duration-200 active:scale-90 hover:text-custom_black'>
          {theme ? '🌚' : '🌞'}
        </div>
      </div>
    </div>
  </div>
}

export default Navbar