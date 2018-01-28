export default function createState() {
    const base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let state = ""
    for(let i=0;i<32;i++) {
        state += base64.charAt(Math.floor(Math.random()*base64.length))
    }
    return state
}