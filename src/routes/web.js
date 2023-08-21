const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getCreatePage,
  getUpdatePage,
  postCreateComment,
  postDeleteComment,
  postUpdateComment,
} = require("../controllers/homeControllers");

//Khai báo routes
router.get("/", getHomePage);

router.get("/create", getCreatePage);

router.get("/update/:id", getUpdatePage);

router.post("/create-comment", postCreateComment);

router.post("/delete-comment", postDeleteComment);

router.post("/update-comment", postUpdateComment);

module.exports = router;
