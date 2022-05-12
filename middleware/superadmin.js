const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res, next) => {
  if (req?.user?.userControl?.role !== "superadmin")
    return res.status(401).json({
      status: "error",
      message: "Restricted area!",
    });

  next();
};
