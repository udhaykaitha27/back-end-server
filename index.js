const express = require("express");
const cors = require("cors");
const env = require("dotenv");

env.config();

const connection = require("./Db-connection/connection.js");
const userRoutes = require('./routers/users.js')


const app = express();
connection();

app.use(cors());
app.use(express.json());
app.use('/',userRoutes);


const port = process.env.PORT;
app.listen(port, () =>
  console.log(`listening on ${port}  ... http://localhost:${port}`)
);
