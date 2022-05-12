const {
  create,
  login,
  list,
  update,
  profile,
} = require("../controllers/users");
const authMiddleware = require("../middleware/auth");
const router = require("express").Router();

router.post("/register", create);
router.post("/login", login);
router.get("/", list);
router.patch("/", authMiddleware, update);
router.get("/profile", authMiddleware, profile);

module.exports = router;
