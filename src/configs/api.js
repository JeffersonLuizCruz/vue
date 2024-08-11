import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

const error = (err) => {
    if (err.response) {
        // Request made and server responded
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
    } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request)
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message)
    }
    console.log(err.config)
}

axios.interceptors.response.use(response => response, error)

Vue.prototype.$http = axios

export default api





