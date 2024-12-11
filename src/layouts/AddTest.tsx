import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { InputTextarea } from "primereact/inputtextarea";
import { TestType } from "../interfaces/ITest";
import addTest from '../services/svAddTest'
import { useNavigate } from "react-router-dom";
import InputTag from "../components/InputTag";

interface AddTestProp {
    setReload: () => void
}

const AddTest: FC<AddTestProp> = ({ setReload }) => {
    const move = useNavigate();
    const [modaVisible, setModalVisible] = useState<boolean>(false)

    const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const data = new FormData(form)

        if (data.get('type') == TestType.code && !data.get('solution')) {
            toast.error("La solución es obligatoria para lós examenes de codificación")
            return;
        }
        


        toast.promise(addTest(data), {
            loading: "Procesando...",
            success: (data) => {
                switch (data.status) {
                    case 200:
                        form.reset()
                        setModalVisible(false)
                        setReload()
                        return "Examen Agregado"
                    case 400:
                        throw new Error("Complete todos los campos")
                    case 401:
                        move('/auth/login')
                        throw new Error("Su session ha expirado")
                        break;
                    case 403:
                        move('/auth/login')
                        throw new Error("Su session ha expirado")
                        break;
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


    return <div>
        <div className='text-4xl fixed bottom-10 right-10 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200' onClick={() => setModalVisible(true)}>
            <i className='pi pi-plus text-5xl bg-secondary p-2 rounded-full shadow-xl'></i>
        </div>
        <Dialog header="Agregar Exámen" visible={modaVisible} style={{width: '80vw'}} onHide={() => { if (!modaVisible) return; setModalVisible(false); }}>
            <form className="flex flex-col gap-5" method="post" onSubmit={handlerSubmit}>
                <div className=" w-ful flex flex-col ">
                    <label htmlFor="" className="font-bold mb-1">Nombre: </label>
                    <InputText placeholder="Soft Test" className="p-2 border-b text-xl" type="name" name="name" required maxLength={25} />
                </div>

                <div className=" w-ful flex flex-col ">
                    <label htmlFor="" className="font-bold mb-1">Pregunta: </label>
                    <InputTextarea name="question" rows={5} cols={30} className=" p-2 resize-none border-b" required />
                </div>

                <div className=" w-ful flex flex-col ">
                    <label htmlFor="" className="p-2 font-bold mb-1">Solution: </label>
                    <InputTextarea name="solution" rows={5} cols={30} className="resize-none border-b" />
                </div>

                <div className=" w-ful flex flex-col ">
                    <label htmlFor="" className="font-bold mb-1">Tags: </label>
                    <small>Vista Previa:  </small>
                    <InputTag />
                    
                </div>

                <div>
                    <label className="block text-xl text-light ">Tipo de Pregunta</label>
                    <div className=" flex flex-col gap-2 text-xl text-light">
                        <div className="flex flex-row ">
                            <input type="radio" id="type1" name="type" value={TestType.code} defaultChecked /> <label htmlFor="type1" className="cursor-pointer px-2" >Codificación</label>
                        </div>
                        <div className="flex flex-row ">
                            <input type="radio" id="type2" name="type" value={TestType.question} /> <label className="px-2 cursor-pointer" htmlFor="type2">Pregunta</label>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end border-t pt-4 mt-2">
                    <Button className="w-fit p-2 flex justify-center items-center cursor-pointer bg-primary text-white font-bold text-2xl rounded-md hover:scale-110 transition-all duration-200 active:scale-90" type="submit">
                        Agregar
                    </Button>
                </div>

            </form>
        </Dialog>
    </div>

}


export default AddTest