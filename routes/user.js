const express = require("express");

const router = express.Router();

const {
 
  getAllUser,
  getuserById,
  updatePassword,
  postUser,
  login,
} = require("../controllers/user");
const { auth, restrictTo } = require("../middlewares/auth");

router.post("/", postUser);
router.get(
  "/",
  // auth, restrictTo("admin"),
  getAllUser
);
router.get(
  "/:id",
  // auth,
  //  restrictTo("admin"),
  getuserById
);

router.post("/login", login);
router.post("/dashboardLogin", auth, login);
router.patch(
  "/updatePassword",
  auth,
  restrictTo("admin", "user", "owner"),
  updatePassword
);

module.exports = router;
