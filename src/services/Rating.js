const mongoose = require("mongoose"),
  TimeTable = mongoose.model("TimeTable"),
  RatingDb = mongoose.model("Rating");
module.exports = class Rating {
  constructor(teacherEmail, lessonId, rating, review, studentName, cource) {
    this.lessonId = lessonId;
    this.rating = rating;
    this.review = review;
    this.teacherEmail = teacherEmail;
    this.studentName = studentName;
    this.cource = cource;
  }

  async addReview() {
    const review = new RatingDb(this);
    await review.save();
    await TimeTable.findByIdAndUpdate(
      { _id: this.lessonId },
      { hasReview: true }
    );

    return true;
  }

  async getReviews() {
    const listofReviews = await RatingDb.find({
      teacherEmail: this.teacherEmail
    });

    return listofReviews;
  }
};
