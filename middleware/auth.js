const { request, response } = require("express");
const { verify } = require("jsonwebtoken");
const { jwtSecret } = require("../config");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res, next) => {
  const author = req.headers?.authorization;

  if (!author && author.search("Bearer ") === -1)
    return res.status(401).json({
      status: "error",
      message: "Please login!",
    });

  const token = author.split("Bearer ")[1];

  const user = verify(token, jwtSecret);

  if (!user)
    return res.status(401).json({
      status: "error",
      message: "Please login!",
    });

  req.user = user;

  next();
};
