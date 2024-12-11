import { ADD_TEST_URL } from "../config/endpoints";

const AddTest = async (data: FormData) => {
    const bag: { [key: string]: string | string[] } = {}
    data.forEach((value, key) => {
        if (typeof value === 'string') {
            bag[key] = value;

        }
    })

    const tag  = data.get('tags') as string ; 
    bag['tags'] = tag.split(' ')

    const token = window.localStorage.getItem('token') || ""
    
    return await fetch(ADD_TEST_URL, {
        method: "POST",
        body: JSON.stringify(bag),
        headers: {
            "Content-Type": 'application/json',
            "token": token
        }
    })
        .then(async res => {
            return { json: await res.json(), status: res.status }
        })
        .then(data => data)
        .catch(err => err)
}

export default AddTest