const EventEmitter = require("events").EventEmitter;
const emitter = new EventEmitter();

const sendEmailOnRegistration = require("./send_email_on_registration");
const sendEmailOnChangeStatus = require("./send_email_on_changelessonstatus");
const sendEmailOnNewLesson = require("./send_email_on_newLesson");

// const someOtherListener = require('./some_other_listener');
// const doSomethingEntirelyDifferent = require('./do_something_entirely_different');

emitter.on("user-registered", sendEmailOnRegistration);
emitter.on("teacher-changestatus", sendEmailOnChangeStatus);
emitter.on("teacher-apointmentLesson", sendEmailOnNewLesson);

module.exports = emitter;
