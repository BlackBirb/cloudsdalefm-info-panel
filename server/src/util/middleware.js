/* eslint-disable import/prefer-default-export */
import { tokensArray } from './cacheDB'

export function Authorization(req, res, next) {
    const header = req.header("Authorization")
    if(!header) {
        return res.status(401).json({status: 401, error: "invalid Authorization header"})
    }
    if(!tokensArray().includes(header)) {
        return res.status(403).json({status: 403, error: "Invalid token"})
    }

    next()
}