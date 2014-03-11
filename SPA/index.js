var connect = require("connect");

var server = connect.createServer(
  connect.static("app")
)

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

console.log(server);

server.listen(8080);