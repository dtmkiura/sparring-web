import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GlobalContextProvider } from './context/globalContext.tsx'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { PrimeReactProvider } from "primereact/api";
import { options } from './config/ReactPrimeOptions.ts'

import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
        

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <HashRouter>
        <Toaster position='top-right' reverseOrder={true} />
        <PrimeReactProvider value={options}>
          <App />
        </PrimeReactProvider>
      </HashRouter>
    </GlobalContextProvider>
  </StrictMode>,
)
