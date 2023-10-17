export const HOST = "http://194.233.71.3:3000"
// export const HOST = "http://localhost:3000"


export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}