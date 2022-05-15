const {
  create,
  update,
  list,
  show,
  destroy,
} = require("../controllers/absensi");
const { filesMiddleware } = require("../middleware");
const router = require("express").Router();

router.post("/", filesMiddleware(false), create);
router.patch("/:id", filesMiddleware(false), update);
router.get("/", list);
router.get("/:id", show);
router.delete("/:id", destroy);

module.exports = router;
