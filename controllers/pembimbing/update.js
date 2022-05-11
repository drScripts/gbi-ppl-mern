const { request, response } = require("express");
const Joi = require("joi");
const { Pembimbing } = require("../../models");

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
        "string.base": "Pembimbing name must be a type of string",
      }),
      cabangId: Joi.number().messages({
        "number.base": "Cabang must be a type of number",
      }),
      birthDate: Joi.date().messages({
        "date.base": "Pembimbing birthday must be a type of date",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name, cabangId, birthDate: birthday } = req.body;

    const { id } = req.params;

    const pembimbing = await Pembimbing.findByPk(id);

    if (!pembimbing)
      return res.status(404).json({
        status: "error",
        message: "Can't find pembimbing with that id",
      });

    const updatedPembimbing = await pembimbing.update({
      name,
      cabangId,
      birthday,
    });

    res.status(201).json({
      status: "created",
      data: { pembimbing: updatedPembimbing },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
