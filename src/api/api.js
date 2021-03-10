import axios from 'axios'

const api = axios.create({
    baseURL: `https://api.github.com/repos/`,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
})


export default api