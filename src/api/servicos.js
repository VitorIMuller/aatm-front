import axios from "axios"

const BASE_URL = "http://localhost:4000"


function createConfig(token) {

    return { headers: { 'Authorization': `${token}` } }
}


export async function signIn(data) {
    
    const login = await axios.post(`${BASE_URL}/login`, data)

    return login
}

export async function createCaminhao(formaData) {
    // const config = createConfig(token)

    const caminhao = await axios.post(`${BASE_URL}/caminhao`, formaData)

    return caminhao.data
}




export async function getFrota() {
    const caminhao = await axios.get(`${BASE_URL}/caminhao`)

    return caminhao.data

}
