const { request, response } = require("express");
const Joi = require("joi");
const { Kelas } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().messages({
        "string.base": "Class name must be a type of string",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { id } = req.params;
    const { name } = req.body;

    const kelas = await Kelas.findByPk(id, { paranoid: false });

    if (!kelas)
      return res.status(404).json({
        status: "error",
        message: "Can't find class with that id",
      });

    const updatedClass = await kelas.update({ name });

    res.status(201).json({
      status: "created",
      data: { class: updatedClass },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
