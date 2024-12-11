// src/context/GlobalContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { IUser } from '../interfaces/IUser';

interface GlobalContextProps {
  language: string; 
  setLanguage: (value: string) => void;
  login: boolean;
  setLogin: (value: boolean) => void;
  user: IUser , 
  setUser: (user: IUser)=> void
}

// Valores predeterminados
const defaultValues: GlobalContextProps = {
  language: 'es',
  login: false,
  user: {
    email:'', 
    name:'',
    token:''
  }, 
  setLanguage: () => {},
  setLogin: () => {},
  setUser: ()=> {}, 
};


// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextProps>(defaultValues);

// Proveedor del contexto global
export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [login, setLogin] = useState<boolean>(defaultValues.login);
  const [language , setLanguage] = useState<string>(defaultValues.language);
  const [user, editUser]= useState<IUser>(defaultValues.user)
  const setUser = (user: IUser)=>{
    editUser(user); 
    window.localStorage.setItem('token', user.token); 
  }
  
  return (
    <GlobalContext.Provider
      value={{
        language,
        login,
        user , 
        setLanguage,
        setLogin,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


