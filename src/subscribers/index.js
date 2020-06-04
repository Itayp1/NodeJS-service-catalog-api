const EventEmitter = require("events").EventEmitter;
const emitter = new EventEmitter();

const sendEmailOnNewService = require("./send_email_on_newService");
const sendEmailOnChangeStatus = require("./send_email_on_changelessonstatus");
const sendEmailOnNewLesson = require("./send_email_on_newLesson");

// const someOtherListener = require('./some_other_listener');
// const doSomethingEntirelyDifferent = require('./do_something_entirely_different');

emitter.on("user-aprovment", sendEmailOnNewService);
emitter.on("teacher-changestatus", sendEmailOnChangeStatus);
emitter.on("teacher-apointmentLesson", sendEmailOnNewLesson);

module.exports = emitter;
