const router = require("express").Router();
const {
  create,
  list,
  update,
  show,
  destroy,
  paranoid,
} = require("../controllers/pembimbing");

router.post("/", create);
router.get("/", list);
router.patch("/:id", update);
router.get("/paranoids", paranoid);
router.get("/:id", show);
router.delete("/:id", destroy);

module.exports = router;
