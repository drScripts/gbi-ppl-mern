const { request, response } = require("express");
const { Cabang } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const cabang = await Cabang.findByPk(id);

    if (!cabang)
      res.status(404).json({
        status: "error",
        message: "Can't find cabang with that id",
      });

    await cabang.destroy();

    res.status(201).json({
      status: "created",
      message: "cabang successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
