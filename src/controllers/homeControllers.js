const User = require("../models/user");

//homepage
const getHomePage = async (req, res) => {
  let results = await User.find({});
  res.render("userComment.ejs", { listData: results });
};

//to model comment
const getCreatePage = (req, res) => {
  res.render("createComments.ejs");
};

//to model edit
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await User.findById(userId).exec();
  res.render("updateComment.ejs", { userEdit: user });
};

//Create Comment
const postCreateComment = async (req, res) => {
  let { title, body, author } = req.body;
  await User.create({
    title,
    body,
    author,
  });
  res.redirect("/");
};

//Delete Comment
const postDeleteComment = async (req, res) => {
  let id = req.body.userId;
  await User.deleteOne({ _id: id });
  res.redirect("/");
};

//Update Comment
const postUpdateComment = async (req, res) => {
  let { title, body, author, userId } = req.body;
  await User.updateOne(
    { _id: userId },
    { title: title, body: body, author: author }
  );
  res.redirect("/");
};

module.exports = {
  getHomePage,
  getCreatePage,
  getUpdatePage,
  postCreateComment,
  postDeleteComment,
  postUpdateComment,
};
