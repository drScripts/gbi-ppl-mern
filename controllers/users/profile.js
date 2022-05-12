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
    const { id } = req.user;

    const user = await User.findByPk(id, {
      include: "userControl",
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user)
      return res.status(401).json({
        status: "error",
        message: "Please login!",
      });

    res.send({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
