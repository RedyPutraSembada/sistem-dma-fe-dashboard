import axios from "axios";
import { cekUserLogin } from "../../utils/cekUserLogin";

export const getAllBarangKeluar = async (start = null, end = null) => {
    const userLogin = cekUserLogin();
    const res = axios.get(`http://localhost:3001/api/barangKeluar?start=${start}&end=${end}`, { headers: { Authorization: userLogin.token } });
    return res
}