import express from 'express';
import path from 'path';

import verify from './routes/verify'
import admin from './routes/admin'

const pageApi = express.Router();


const options = {
  etag: false,
  extensions: ['htm', 'html'],
  index: ["index.html"],
  maxAge: '1d',
  redirect: false
}
  
pageApi.use(express.static(path.join(__dirname, "public"), options))

pageApi.use("/api/verify", verify)

pageApi.use("/api/admin", admin)

export default pageApi