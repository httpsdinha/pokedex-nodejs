const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setupApp();
    this.setupRoutes();
  }

  setupApp() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
    this.app.set("view engine", "handlebars");
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  setupRoutes() {
    this.app.use("/", require("./routes/index"));
  }

  start() {
    this.app.listen(this.port);
    console.log(`Server listening on port ${this.port}`);
  }
}

const server = new Server(3000);
server.start();