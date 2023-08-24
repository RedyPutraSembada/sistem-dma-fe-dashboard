import axios from "axios";
import { cekUserLogin } from "../../utils/cekUserLogin";
// export const loginUser = async (data) => {
//     return await axios.post('http://localhost:3001/auth/login', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
// }

export const loginUser = async (data) => {
    const res = await axios.post('http://localhost:3001/auth/login', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    return res;
}

export const logoutUser = async () => {
    const userLogin = cekUserLogin();
    const res = await axios.post('http://localhost:3001/auth/logout', null, { headers: { Authorization: `Bearer ${userLogin.token}` } });
    return res;
}