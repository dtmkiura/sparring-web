import { GET_TEST_URL } from "../config/endpoints"

const GetAllTest = async () => {
    const token = window.localStorage.getItem('token') || ""
    return await fetch(GET_TEST_URL, {
        method: "GET",
        headers: {
            "token":token
        }
    })
        .then(async res => {
            return {json: await res.json(), status: res.status}
        })
        .then(data => data)
        .catch(err => err)


}

export default GetAllTest