import axios from "axios";
import { cekUserLogin } from "../../utils/cekUserLogin";

export const getUsers = () => {
    const userLogin = cekUserLogin();
    const res = axios.get('http://localhost:3001/api/users', { headers: { Authorization: userLogin.token } });
    return res;
}

export const createUser = (data) => {
    const userLogin = cekUserLogin();
    const res = axios.post('http://localhost:3001/api/user', data, {
        headers: {
            Authorization: userLogin.token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    return res;
}

export const updateUser = (id, data) => {
    const userLogin = cekUserLogin();
    const res = axios.put(`http://localhost:3001/api/user/${id}`, data, {
        headers: {
            Authorization: userLogin.token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    return res;
}