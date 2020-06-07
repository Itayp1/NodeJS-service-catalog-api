const mongoose = require("mongoose");

const RestService = new mongoose.Schema({
  serviceNameHeb: {
    type: String,
    required: false,
    unique: false
  },
  serviceNameEng: {
    type: String,
    required: false,
    unique: false
  },
  backendUrlQA: {
    type: String,
    required: false,
  },
  backendUrlPRD: {
    type: String,
    required: false
  },
  businessOwner: {
    type: String,
    required: false
  },
  techOwner: {
    type: String,
    required: false
  },
  serviceDetails: {
    type: String,
    required: false
  },
  serviceDetailsFile: {
    type: String,
    required: false
  },
  swaggerFile: {
    type: String,
    required: false
  },
  swaggerFileExist: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['rest'],
    default: 'rest'
  }
});

mongoose.model("RestService", RestService);
