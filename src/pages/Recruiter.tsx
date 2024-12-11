import { useContext, useState } from "react"
import Menu from "../components/Menu"

import { GlobalContext } from "../context/globalContext"
import Stat from "../components/Stat"
import TestList from "../layouts/TestList"
import AddTest from "../layouts/AddTest"

const Recruiter = () => {
    const [reload, setReload] = useState<boolean>(false)
    const refresh = ()=>{
        setReload(prev=> !prev)
    }
    const { user } = useContext(GlobalContext)
    return <div className="flex flex-col min-h-screen w-full bg-primary">
        <Menu  name={user.name} >
            <div className="flex  flex-col gap-4 border-t pt-4 items-center">
                
            </div>
        </Menu>
        
        <div className="flex flex-wrap w-full  mt-12 p-4 h-fit justify-evenly gap-12">
            <Stat title="Reclutadores" value={120} razon={12} direction="UP" />
            <Stat title="Candidatos" value={947} razon={37} direction="DOWN" />
            <Stat title="Exámenes" value={214} razon={18} direction="UP" />
            <Stat title="Visitantes" value={792} razon={3} direction="UP" />
            <Stat title="Mentorías" value={15} razon={90} direction="UP" />
        </div>

        <hr className="my-12" />

        <div className=" p-4  ">
            <TestList reload={reload} />
        </div>
        <AddTest setReload={refresh} />
    </div>
}

export default Recruiter