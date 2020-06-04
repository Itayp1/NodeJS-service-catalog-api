const router = require("express").Router(),
  SERVICES = require("./routes/Services"),
  PENDING = require("./routes/Pending"),
  APROVE = require("./routes/Aprove.js"),
  STATUS = require("./routes/Status.js"),
  SWAGGER = require("./routes/swagger"),
  CREATESERVICE = require("./routes/CreateService");

const { serve } = require('swagger-ui-express');



router.use('/api-docs', serve);
router.get('/api-docs/:serviceNameEng', SWAGGER())

// swaggerUi.setup(req.swaggerDoc))

// router.use('/api-docs', (req, res, next) => {
//   const swaggerDocument =
//     console.log("ssssss")
//   res.locals.swaggerDocument = swaggerDocument;
//   next()
// })





// REGISTRATION = require("./routes/registration"),
// SearchTeacher = require("./routes/SearchTeacher"),
// Lessons = require("./routes/Lessons"),
// SendEmail = require("./routes/menora/sendEmail"),
// Rating = require("./routes/Rating"),
// UpdateInfo = require("./routes/Information");
router.use("/services/pending", PENDING);

router.use("/services", SERVICES);
router.use("/services/status", STATUS);
router.use("/services/aprove", APROVE);
router.use("/createservice", CREATESERVICE);


// router.use("/registration", REGISTRATION);
// router.use("/searchTeacher", SearchTeacher);
// router.use("/lessons", Lessons);
// router.use("/information", UpdateInfo);
// router.use("/rating", Rating);
// router.use("/sendmail", SendEmail);

module.exports = router;
