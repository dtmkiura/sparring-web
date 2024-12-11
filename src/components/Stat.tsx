import { Card } from "primereact/card"
import { FC } from "react";

interface StatProp {
    title: string  ; 
    value: number  ; 
    razon: number ; 
    direction: "UP" | "DOWN"
}


const Stat:FC<StatProp> = ({ title, value, razon, direction }) => {
    return <Card title={title}  className=" h-fit  px-5">
        <div className="flex flex-row justify-between px-4 gap-20  h-fit  -mt-4">
            <div className="flex-col ">
                <div className="text-3xl font-bold text-custom_black">
                    {value}
                </div>
                <div className={`text-sm  font-extrabold ${direction=="UP"?'text-green-400':'text-red-400'} mt-2 flex-nowrap`}>
                    <i className={`pi ${direction=="UP"?'pi-arrow-up':'pi-arrow-down'} text-sm mr-2 `}></i>
                    {razon} %
                </div>
            </div>
            <div className=" size-14 items-center justify-center text-6xl rotate-90 -mt-1">
                {direction=="UP"?"📉":"📈"}
            </div>
        </div>
    </Card>
}

export default Stat