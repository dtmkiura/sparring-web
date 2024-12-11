
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Recruiter from "./pages/Recruiter"

const App = () => {
  return <Routes>
    <Route path="" element={<Home />}></Route>
    <Route path="auth/login" element={<Login />} />
    <Route path="auth/register" element={<Register /> } />
    <Route path="/dasboard/recruiter"  element={<Recruiter />}/>
    <Route path="*" element={<Login />}></Route>
  </Routes>
}


export default App