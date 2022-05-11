const { request, response } = require("express");
const { Kelas } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const kelas = await Kelas.findByPk(id);

    if (!kelas)
      return res.status(404).json({
        status: "error",
        message: "Can't find class with that id",
      });

    await kelas.destroy();

    res.status(201).json({
      status: "created",
      message: "Class successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
