import axios from "axios";

// export const loginUser = async (data) => {
//     return await axios.post('http://localhost:3001/auth/login', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
// }

export const loginUser = async (data) => {
    const res = await axios.post('http://localhost:3001/auth/login', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    return res;
} 