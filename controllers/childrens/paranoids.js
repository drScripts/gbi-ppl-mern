const { request, response } = require("express");
const { Children, User, Pembimbing, Kelas } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const childrens = await Children.findAll({
      include: [
        {
          as: "pembimbing",
          model: Pembimbing,
          paranoid: false,
        },
        {
          as: "kelas",
          model: Kelas,
          paranoid: false,
        },
        {
          as: "created",
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          as: "updated",
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          as: "deleted",
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      paranoid: false,
    });

    res.send({
      status: "success",
      data: { childrens },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
