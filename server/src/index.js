import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import verify from './routes/verify'
import admin from './routes/admin'

const port = 8080
const app = express();
app.use(bodyParser.json())


const options = {
    etag: false,
    extensions: ['htm', 'html'],
    index: ["index.html"],
    maxAge: '1d',
    redirect: false
  }
  
app.use(express.static(path.join(__dirname, "public"), options))

app.use("/api/verify", verify)

app.use("/api/admin", admin)

app.listen(port, () => console.log("Listening on port",port))