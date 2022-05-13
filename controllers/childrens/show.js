const { request, response } = require("express");
const { Children, User, Kelas, Pembimbing } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const children = await Children.findByPk(id, {
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
      data: { children },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
