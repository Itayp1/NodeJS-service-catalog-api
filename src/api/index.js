const router = require("express").Router(),
  SERVICES = require("./routes/Services"),
  CREATESERVICE = require("./routes/CreateService");

// const swaggerUi = require('swagger-ui-express');
// const fs = require("fs")
// const swaggerDocument = require('./swagger.json');


// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs/:id', (req, res, next) => { console.log(req.params.id), req.swaggerDoc = JSON.parse(fs.readFileSync(`C:/Intel/Logs/${req.params.id}.json`)), next() }, swaggerUi.setup(swaggerDocument));


// router.use('/api-docs', (req, res, next) => {
//  const swaggerDocument =  
//   console.log("ssssss")
//   res.locals.swaggerDocument = swaggerDocument;
//   next()
// })





// REGISTRATION = require("./routes/registration"),
// SearchTeacher = require("./routes/SearchTeacher"),
// Lessons = require("./routes/Lessons"),
// SendEmail = require("./routes/menora/sendEmail"),
// Rating = require("./routes/Rating"),
// UpdateInfo = require("./routes/Information");
router.use("/services", SERVICES);
router.use("/createservice", CREATESERVICE);


// router.use("/registration", REGISTRATION);
// router.use("/searchTeacher", SearchTeacher);
// router.use("/lessons", Lessons);
// router.use("/information", UpdateInfo);
// router.use("/rating", Rating);
// router.use("/sendmail", SendEmail);

module.exports = router;
