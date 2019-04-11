require("dotenv").config();
const express = require("express");
const massive = require("massive");
const pc = require("./products_controller");

const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(error => console.log(error));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.params);
  next();
});

const URL = "/api/products";

app.post(URL, pc.create);
app.get(`${URL}/:id`, pc.getOne);
app.get(URL, pc.getAll);
app.put(`${URL}/:id`, pc.update);
app.delete(`${URL}/:id`, pc.deleteOne);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
