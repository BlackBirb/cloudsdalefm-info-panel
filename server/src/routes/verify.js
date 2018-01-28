import express from 'express';
import fetch from 'snekfetch';

const router = express.Router()

const authorized = ["206908148957708288","198752832491356160","315236783858384897","275542459679899649"]

const discordTokens = new Map(
    [
        ["token", "id"]
    ]
)

const tokens = new Map(
    [
        ["id", "token"]
    ]
)

function createToken() {
    const base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""
    for(let i=0;i<32;i++) {
        token += base64.charAt(Math.floor(Math.random()*base64.length))
    }
    return token
}

function askDiscord(token) {
    console.log("Discord asked")
    return fetch.get("https://discordapp.com/api/v6/users/@me")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .then(response => {
            if(!response.ok) {
                return 1
            }
            discordTokens.set(token, response.body.id)
            return response.body.id
        })
}

router.post("/", async (req, res) => {
    console.log("Request")
    const { credentials } = req.body;
    if(!authorized.includes(credentials.id))
        return res.status(400).json({user : {valid: false, token: "CHUJ"}, error: "Not Autorized"})
    
    console.log(credentials)

    let validID = false;

    if(discordTokens.has(credentials.token)) 
        validID = discordTokens.get(credentials.token)
    else
        validID = await askDiscord(credentials.token)

    if(validID !== credentials.id) 
        return res.status(400).json({user: { valid: false, token: "NOPE"}, error: "Invalid credentials"})

    let returnToken = createToken()
    if(tokens.has(validID)) {
        returnToken = tokens.get(validID)
    } else {
        tokens.set(validID,returnToken)
    }
    console.log(validID, returnToken)
    return res.status(200).json({user: {valid: true, token: returnToken}})
})

export default router