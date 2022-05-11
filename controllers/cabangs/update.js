const { request, response } = require("express");
const Joi = require("joi");
const { Cabang } = require("../../models");

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
        "string.base": "Cabang name must be a type of string",
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

    const cabang = await Cabang.findByPk(id);

    if (!cabang)
      return res.status(404).json({
        status: "error",
        message: "Can't find cabang with that id",
      });

    await cabang.update({ name });

    res.status(201).json({
      status: "created",
      data: { cabang },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
