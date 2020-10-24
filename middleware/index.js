const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

const middleware = [];

middleware.push(cookieParser());
middleware.push(bodyParser.json());
middleware.push(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  middleware.push(morgan());
}

if (process.env.NODE_ENV === "product") {
  middleware.push(compression());
  middleware.push(helmet());
}

middleware.set = (app) => {
  middleware.forEach(module => {
    app.use(module);
  });
};

module.exports = middleware;
