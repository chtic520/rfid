import axios from 'axios';

export default function fetch(Url, Data = {}) {
    return axios.post(Url, Data)
}