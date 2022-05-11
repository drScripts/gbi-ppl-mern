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
    const pembimbings = await Pembimbing.findAll({
      paranoid: true,
      include: {
        as: "cabang",
        model: Cabang,
        paranoid: false,
      },
    });

    res.send({
      status: "success",
      data: { pembimbings },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
