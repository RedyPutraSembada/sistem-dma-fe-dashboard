export const cekUserLogin = () => {
    return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
}