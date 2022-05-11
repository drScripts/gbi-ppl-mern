const { request, response } = require("express");
const { Pembimbing } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const pembimbing = await Pembimbing.findByPk(id);

    if (!pembimbing)
      return res.status(404).json({
        status: "error",
        message: "Can't find pembimbing with that id",
      });

    await pembimbing.destroy();

    res.status(201).json({
      status: "created",
      message: "Pembimbing successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
