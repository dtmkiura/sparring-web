import { LOGIN_URL } from "../config/endpoints"

const svLogin = async (data: FormData) => {
    const bag: {[key:string]:string}  = { }
    data.forEach(( value, key)=>{
        if (typeof value === 'string') {
            bag[key] = value;
        } 
    })
    
    return await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(bag), 
        headers: {
            "Content-Type":'application/json'
        }
    })
        .then(async res => {
            return {json: await res.json(), status: res.status}
        })
        .then(data => data)
        .catch(err => err)
}

export default svLogin