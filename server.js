const http = require("http");
const app = require("./app");
require("dotenv").config();

app.set("port", process.env.PORT || 4000);
const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`server started on port ${process.env.PORT || 4000}`);
});
