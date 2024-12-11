import { InputText } from "primereact/inputtext"
import { FixedBG } from "../layouts/FixedBG"
import { useNavigate } from "react-router-dom"
import { Button } from "primereact/button";
import { FormEvent, useContext} from "react";
import toast from "react-hot-toast";
import svLogin from "../services/svLogin";
import { GlobalContext } from "../context/globalContext";
import { KeyExtractor } from "../helpers/jwt";

const Login = () => {

  const move = useNavigate();
  const { setUser, setLogin } = useContext(GlobalContext)

  const rolRedirect = (rol: string) => {
    switch (rol) {
      case 'Candidate':
        move('/dasboard/candidate')
        break;
      case 'Recruiter':
        move('/dasboard/recruiter')
        break;
      default:

    }
  }
  
  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const data = new FormData(form)

    toast.promise(svLogin(data), {
      loading: "Procesando...",
      success: (data) => {
        switch (data.status) {
          case 200:
            setUser(data.json.user);
            setLogin(true)
            console.log(data.json.user)
            setTimeout(() => rolRedirect(KeyExtractor(data.json.user.token, "rol")), 2000)
            return "Login exitoso";
          case 400:
            throw new Error("Rellene todos los campos");
          case 401:
            throw new Error("Usuario o contraseña incorrectos");
          default:
            throw new Error("Inténtelo más tarde");
        }
      },
      error: (err) => {
        console.log(err.message)
        return err.message;
      }
    })

  }

  return <div className="flex flex-col items-center justify-center h-screen bg-secondary user-select-none ">
    <FixedBG />
    <div className="border rounded-md p-8 z-10 flex flex-col bg-white text-light text-xl gap-5 ">
      <div className="w-full flex justify-between items-center">
        <div className="font-bold text-custom_black">
          Login
        </div>
        <div>
          <i className="pi pi-home text-dark text-3xl hover:scale-110 transition-all duration-200 active:scale-90 cursor-pointer" onClick={() => move("/")}></i>
        </div>
      </div>
      <div>
        Por favor introduzca sus datos.
      </div>

      <form className="flex flex-col gap-5" method="post" onSubmit={handlerSubmit}>
        <div className="p-inputgroup flex-1 border rounded-md">
          <span className="p-inputgroup-addon">
            <i className="pi pi-envelope"></i>
          </span>
          <InputText placeholder="sparring@gmail.com" className="pl-2" type="email" name="email" required />
        </div>


        <div className="p-inputgroup flex-1 border rounded-md">
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock"></i>
          </span>
          <InputText placeholder="********" className="pl-2" type="password" name="password" required />
        </div>
        <div className="flex items-center gap-12">
          <label className="flex-1  flex gap-2 text-sm text-custom_black font-bold cursor-pointer" htmlFor="remember">
            <input type="checkbox" className="text-xl" name="remember" id="remember" />
            <div>Remember me</div>
          </label>

          <div className="text-sm cursor-pointer hover:text-primary" onClick={() => move("/auth/register")}>
            Crear Cuenta
          </div>
        </div>

        <Button className="w-full p-2 flex justify-center items-center cursor-pointer bg-primary text-white font-bold text-2xl rounded-md hover:scale-110 transition-all duration-200 active:scale-90" type="submit">
          Entrar
        </Button>
      </form>



    </div>
  </div>
}



export default Login