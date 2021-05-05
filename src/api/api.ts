import axios from "axios"

const url = 'example.com'

const instance = axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
})
