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
      name: Joi.string().required().messages({
        "string.base": "Pembimbing name must be a type of string",
        "any.required": "Please insert pembimbing name",
      }),
      cabangId: Joi.number().required().messages({
        "number.base": "Cabang must be a type of integer",
        "any.required": "Please inser cabang",
      }),
      birthDate: Joi.date().messages({
        "date.base": "Pembimbing birthday date must be a type of date",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name, cabangId, birthDate: birthday } = req.body;

    const pembimbing = await Pembimbing.create({ name, cabangId, birthday });

    res.status(201).json({
      status: "created",
      data: { pembimbing },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
