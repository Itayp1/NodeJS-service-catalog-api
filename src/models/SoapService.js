const mongoose = require("mongoose");

const SoapService = new mongoose.Schema({
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
  wsdlFile: {
    type: String,
    required: false
  },
  xsdFiles: {
    type: [],
    required: false
  },
  type: {
    type: String,
    enum: ['soap'],
    default: 'soap'
  }

});

mongoose.model("SoapService", SoapService);
