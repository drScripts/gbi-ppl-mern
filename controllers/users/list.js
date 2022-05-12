const { request, response } = require("express");
const { User } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      paranoid: false,
      include: "userControl",
      attributes: {
        exclude: ["password"],
      },
    });

    res.send({
      status: "success",
      data: { users },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
