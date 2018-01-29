import express from 'express';

import { Authorization } from '../util/middleware'

const router = express.Router()

router.use(Authorization)

router.get('/', (req, res) => {
    res.status(200).send("Success!")
})


export default router