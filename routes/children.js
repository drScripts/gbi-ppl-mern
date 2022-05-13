const {
  create,
  list,
  paranoids,
  update,
  show,
  destroy,
} = require("../controllers/childrens");

const router = require("express").Router();

router.post("/", create);
router.get("/", list);
router.get("/paranoids", paranoids);
router.patch("/:id", update);
router.get("/:id", show);
router.delete("/:id", destroy);

module.exports = router;
