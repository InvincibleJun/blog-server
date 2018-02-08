var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
// var RedisStore = require("connect-redis")(session);
const expressValidator = require("express-validator");

var router = require("./routes");
var finallyOutput = require("./middlewares/finally")
var app = express();

global.mdb = require("./models");
<<<<<<< HEAD
app.use(
  session({
    secret: "blog_session",
    name: "sessionid"
  })
);

app.all("*", function(req, res, next) {
=======
app.all("*", function (req, res, next) {
>>>>>>> c834ee8cba4db42499e7d847a19e1887dd4ec193
  //设置全局访问，这里的*将到替换成你的域名
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.setHeader("Access-Control-Allow-Origin", "*");
  //告诉客户端可以接受请求的方式
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );

  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressValidator());
app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(finallyOutput);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
