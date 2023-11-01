const express = require("express");
const  methodOverride = require('method-override')
const bodyParser = require('body-parser')
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "./views");
app.set("view engine", "pug");

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

// Routes
route(app);

// RoutesAdmin
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});   