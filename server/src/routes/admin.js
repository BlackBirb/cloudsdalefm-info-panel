import express from 'express';

import { Authorization } from '../util/middleware'

const router = express.Router()

router.use(Authorization)

router.get("/connectiondetails", (req, res) => {
    res.status(200).json({
        host: "heck.no.com", 
        port: 2137, 
        login: "NiceLogin", 
        pass: "VeryStrong"
    })
})

router.get('/', (req, res) => {
    res.status(200).send("Success!")
})


export default router