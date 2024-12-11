import { InputText } from "primereact/inputtext";
import { useState } from "react";

const InputTag = () => {
    const [value, setValue] = useState<string>("")

    return <div className="w-full">
        <InputText placeholder="HTML CSS" className="w-full border-b text-xl p-2" value={value} onChange={(e) => setValue(e.target.value)} type="text" name="tags" required />
        <div className="flex w-full flex-row gap-2 mt-2">
            {value.split(' ').map((value, index) => {
                if (value) return <div className="flex gap-1 border rounded-md bg-slate-300 p-1 items-center" key={index}>
                    <i className="pi pi-tag"></i><div>{value}</div>
                </div>
            })}
        </div>
    </div>
}

export default InputTag;