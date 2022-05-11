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

    const classes = await Kelas.findByPk(id, { paranoid: false });

    if (!classes)
      return res.status(404).json({
        status: "error",
        message: "Can't find class with that id",
      });

    res.send({
      status: "success",
      data: { class: classes },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
