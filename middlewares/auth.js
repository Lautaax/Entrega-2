import ErrorCode from "../src/dao/services/errors/enum.errors.js";
import CustomError from "../src/dao/services/errors/errors.service.js";
import { authenticationErrorInfo } from "../src/dao/services/errors/info.js";

function roladm(req, res, next) {

  if (req.session.user.role === "user" && req.session.role !== undefined) {
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  } else {
    next();
  }
}
function roluser(req, res, next) {
  if (req.session.user.role === "admin") {
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  } else {
    next();
  }
}
function checkLogin(req, res, next) {
  if (!req.session.user.email || !req.session.user.password) {
    const error = CustomError.createError({
      name: "Authentication error",
      cause: authenticationErrorInfo(),
      message: "Error authenticating user",
      code: ErrorCode.AUTHENTICATION_ERROR,
      status: 401,
    });
    return next(error);
  }
  if (!req.session.user) {
    return res.redirect("/");

  }
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}

export { checkLogged, checkLogin, roladm, roluser };