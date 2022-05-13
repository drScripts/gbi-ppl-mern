const { request, response } = require("express");
const Joi = require("joi");
const { Children } = require("../../models");

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
        "string.base": "Children name must be a type of string",
        "any.required": "Please insert children name",
      }),
      code: Joi.string().messages({
        "string.base": "Children code must be a type of string",
      }),
      pembimbingId: Joi.number().required().messages({
        "number.base": "Pembimbing must be a type of integer",
        "any.required": "Please insert pembimbing",
      }),
      kelasId: Joi.number().required().messages({
        "number.base": "Kelas must be a type of integer",
        "any.required": "Please insert children kelas",
      }),
      birthday: Joi.date().messages({
        "date.base": "Children birthday must be a type of date",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { id } = req.user;
    const { name, code, pembimbingId, kelasId, birthday } = req.body;

    const children = await Children.create({
      name,
      code,
      pembimbingId,
      kelasId,
      birthday,
      createdBy: id,
    });

    res.status(201).json({
      status: "created",
      data: { children },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
