import axios from "axios";
import { cekUserLogin } from "../../utils/cekUserLogin";

export const getProducts = async () => {
    const userLogin = cekUserLogin();
    const data = await axios.get('http://localhost:3001/api/product', { headers: { Authorization: userLogin.token } });
    return data;
}

export const createProduct = async (data) => {
    const userLogin = cekUserLogin();
    const res = await axios.post('http://localhost:3001/api/product', data,
        {
            headers:
            {
                Authorization: userLogin.token,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return res;
}

export const updateProduct = async (id, data) => {
    const userLogin = cekUserLogin();
    const res = await axios.put(`http://localhost:3001/api/product/${id}`, data,
        {
            headers:
            {
                Authorization: userLogin.token,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return res;
}

export const deleteProduct = async (id) => {
    const userLogin = cekUserLogin();
    const res = axios.delete(`http://localhost:3001/api/product/${id}`,
        {
            headers:
            {
                Authorization: userLogin.token,
            }
        }
    );
    return res;
}