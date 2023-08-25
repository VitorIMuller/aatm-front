import axios from "axios"

const BASE_URL = "http://localhost:4000/api"


function createConfig(token) {

    return { headers: { 'Authorization': `${token}` } }
}


export async function signIn(data) {
    
    const login = await axios.post(`${BASE_URL}/login`, data)

    return login
}

export async function createCaminhao(formaData) {
    // const config = createConfig(token)

    const frota = await axios.post(`${BASE_URL}/frota`, formaData)

    return frota.data
}

export async function getFrota() {
    const caminhao = await axios.get(`${BASE_URL}/frota`)
    console.log(caminhao)

    return caminhao.data

}
