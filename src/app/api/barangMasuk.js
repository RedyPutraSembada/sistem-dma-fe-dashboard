import axios from "axios";
import { cekUserLogin } from "../../utils/cekUserLogin";

export const getAllBarangMasuk = async () => {
    const userLogin = cekUserLogin();
    const res = axios.get('http://localhost:3001/api/barangMasuk', { headers: { Authorization: userLogin.token } })
    return res;
}