import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import verify from './routes/verify'

const port = 8080
const app = express();
app.use(bodyParser.json())

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use("/api/verify", verify)

app.listen(port, () => console.log("Listening on port",port))