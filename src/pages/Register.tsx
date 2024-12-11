import { InputText } from "primereact/inputtext"
import { FixedBG } from "../layouts/FixedBG"
import { Password } from "primereact/password"
import { FormEvent, useContext, useState } from "react"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import svRegister from "../services/svRegister"
import { SelectButton } from 'primereact/selectbutton';
import { KeyExtractor } from "../helpers/jwt"
import { GlobalContext } from "../context/globalContext"


const Register = () => {

  const [passValue, setPassValue] = useState("")
  const roleOptions = ['Recruiter', 'Candidate'];
  const [roleValue, setRoleValue] = useState(roleOptions[0]);
  const { setLogin, setUser } = useContext(GlobalContext)
  const move = useNavigate();


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


    toast.promise(svRegister(data), {
      loading: "Procesando...",
      success: (data) => {
        switch (data.status) {
          case 200:
            setUser(data.json.user);
            setLogin(true)
            setTimeout(() => rolRedirect(KeyExtractor(data.json.user.token, "rol")), 2000)
            return "Registro exitoso"
          case 400:
            throw new Error("Complete todos los campos")
          case 409:
            console.log(data.json)
            throw new Error(data.json.message)
          default:
            throw new Error("Inténtelo más tarde")
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
          Registrarce
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
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="sparring" className="pl-2" type="name" name="name" required />
        </div>


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
          <Password value={passValue} name="password" className="pl-2  flex-1" required onChange={(e) => setPassValue(e.target.value)} placeholder="**********" promptLabel="Escriba su clave" weakLabel="Demasiado débil" mediumLabel="Débil" strongLabel="Fuerte" />
        </div>

        <div className="hidden">
          <label className="block text-xl text-light ">Tipo de usuario</label>
          <SelectButton value={roleValue} onChange={(e) => setRoleValue(e.target.value)} options={roleOptions} className="mt-2 border w-fit rounded-md" />
        </div>

        <input type="text" className="hidden" name="role" onChange={(e) => setRoleValue(e.target.value)} value={roleValue} />


        <div className="flex items-center gap-2">
          <label className=" flex gap-2 text-sm text-custom_black font-bold cursor-pointer" htmlFor="remember">
            <input type="checkbox" className="text-xl" name="termAndConditions" id="remember" required />
            <div>He leído el </div>
          </label>

          <div className="text-sm cursor-pointer hover:text-primary" onClick={() => alert(`Aviso Legal: \nEste material fue desarrollado por Deivis Torres Mena como parte del proceso de reclutamiento en Kiura.\nSe autoriza la reproducción total o parcial de este contenido, siempre que se mencione la fuente original, el autor y el año de publicación. El uso de este material no implica la aprobación de ningún trabajo académico ni la validación de exámenes de licenciatura o doctorado. Este contenido es propiedad exclusiva de Deivis Torres Mena.`)}>
            Aviso legal
          </div>
        </div>

        <Button className="w-full p-2 flex justify-center items-center cursor-pointer bg-primary text-white font-bold text-2xl rounded-md hover:scale-110 transition-all duration-200 active:scale-90" type="submit">
          Registrarse
        </Button>
      </form>

      <div className="flex items-center gap-2 w-full justify-end">
        <label className=" flex gap-2 text-sm text-light font-bold cursor-pointer" htmlFor="remember">
          <div>Ya tienes cuenta </div>
        </label>

        <div className="text-sm cursor-pointer hover:text-primary" onClick={() => move('/login')}>
          Inicia sessión
        </div>
      </div>
    </div>
  </div>
}

export default Register