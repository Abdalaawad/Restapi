const express = require(`express`);
const app = express();
require("dotenv").config();
const Status = require(`./utility/status_varible`);
const db_connection = require(`./config/dbconnections`);
db_connection();

app.use(express.json({ limit: "20kb" }));

const router_products = require(`./Routes/route_product`);
const router_users = require(`./Routes/route-users`);
app.use(`/`, router_products);
app.use(`/`, router_users);

app.all(`*`, (req, res) => {
  res.status(404).json({
    status: 404,
    message: "page not found",
  });
});

app.use((error, req, res, next) => {
  res.status(error.status_code || 500).json({
    status: error.status,
    message: error.message,
  });
});

app.listen(process.env.PORT_SERVER, () => {
  console.log(`server is running on port 5000`);
});
