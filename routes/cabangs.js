const router = require("express").Router();
const {
  create,
  list,
  show,
  destroy,
  update,
  paranoids,
} = require("../controllers/cabangs");

router.post("/", create);
router.get("/", list);
router.get("/paranoids", paranoids);
router.get("/:id", show);
router.delete("/:id", destroy);
router.patch("/:id", update);

module.exports = router;
