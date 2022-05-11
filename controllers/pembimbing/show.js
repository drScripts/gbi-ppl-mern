const { request, response } = require("express");
const { Pembimbing, Cabang } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const pembimbing = await Pembimbing.findByPk(id, {
      include: {
        as: "cabang",
        model: Cabang,
        paranoid: false,
      },
      paranoid: false,
    });

    if (!pembimbing)
      return res.status(404).json({
        status: "error",
        message: "Can't find pembimbing with that id",
      });

    res.send({
      status: "success",
      data: { pembimbing },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
