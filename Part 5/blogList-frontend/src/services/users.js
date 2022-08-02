import axios from 'axios'
const baseUrl='api/users'

const create = async (newObject)=>{
    const response=await axios.post(baseUrl, newObject)
    return response.data
}
const getAll=()=>{
    const request=axios.get(baseUrl)
    return request.then(response=>response.data)}
export default {create, getAll}