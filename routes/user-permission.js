const { list, update, destroy } = require("../controllers/user-permission");
const router = require("express").Router();

router.get("/", list);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
