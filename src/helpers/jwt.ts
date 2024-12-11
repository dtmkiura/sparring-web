export const KeyExtractor = (jwt:string , key?:string)=>{
    const data  = jwt.split('.')[1]
    const info  = JSON.parse(atob(data))
    return key?info[key]: info
     
}