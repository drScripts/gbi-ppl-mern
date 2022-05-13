const { request, response } = require("express");
const Joi = require("joi");
const { Children, Pembimbing, User, Kelas } = require("../../models");

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
        "string.base": "Children name must be a type of string",
      }),
      code: Joi.string().messages({
        "string.base": "Children code must be a type of string",
      }),
      pembimbingId: Joi.number().messages({
        "number.base": "Pembimbing must be a type of integer",
      }),
      kelasId: Joi.number().messages({
        "number.base": "Kelas must be a type of integer",
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

    const { id } = req.params;
    const { id: userId } = req.user;
    const { name, kelasId, pembimbingId, birthday, code } = req.body;

    const children = await Children.findByPk(id);

    if (!children)
      return res.status(404).json({
        status: "error",
        message: "Can't find children with that id",
      });

    await children.update({
      name,
      kelasId,
      pembimbingId,
      birthday,
      code,
      updatedBy: userId,
    });

    const newChildren = await Children.findByPk(id, {
      include: [
        {
          as: "pembimbing",
          model: Pembimbing,
          paranoid: false,
        },
        {
          as: "kelas",
          model: Kelas,
          paranoid: false,
        },
        {
          as: "created",
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          as: "updated",
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          as: "deleted",
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    res.status(201).json({
      status: "created",
      data: { children: newChildren },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
