/** Im making it  so i can easly add everything to existing express app */

import express from 'express';
import bodyParser from 'body-parser';

import App from './app'

const port = 8080
const app = express();
app.use(bodyParser.json())

app.use("/", App)

app.listen(port, () => console.log("Listening on port",port))