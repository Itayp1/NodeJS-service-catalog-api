/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const CERROR = require("../services/CustomError"),
  mongoose = require("mongoose"),
  Rating = mongoose.model("Rating");

module.exports = async (req, res, next) => {
  const { lessonId } = req.body;
  try {
    const response = await Rating.findOne({
      lessonId: lessonId
    });
    if (response) {
      throw new Error("Review Already exist");
    }

    next();
  } catch (error) {
    next(new CERROR(error, 400));
  }
};
