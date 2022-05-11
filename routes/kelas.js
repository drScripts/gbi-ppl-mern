const {
  create,
  show,
  list,
  paranoid,
  update,
  destroy,
} = require("../controllers/kelas");

const router = require("express").Router();

router.post("/", create);
router.get("/paranoids", paranoid);
router.get("/:id", show);
router.get("/", list);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
