const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const getUserToken = (user) => {
  const plainObject = {
    ...user?.dataValues,
    userControl: user?.userControl?.dataValues,
  };

  return sign(plainObject, jwtSecret);
};

module.exports = {
  getUserToken,
};
