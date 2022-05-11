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
      name: Joi.string().required().messages({
        "string.base": "Class name should be a type of string",
        "any.required": "Please insert class name",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name } = req.body;

    const kelas = await Kelas.create({ name });

    res.status(201).json({
      status: "created",
      data: { kelas },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
