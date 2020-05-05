const mongoose = require("mongoose");

const SoapService = new mongoose.Schema({
  serviceNameHeb: {
    type: String,
    required: true,
    unique: true
  },
  serviceNameEng: {
    type: String,
    required: true,
    unique: true
  },
  backendUrlQA: {
    type: String,
    required: true,
  },
  backendUrlPRD: {
    type: String,
    required: false
  },
  businessOwner: {
    type: String,
    required: true
  },
  techOwner: {
    type: String,
    required: true
  },
  serviceDetails: {
    type: String,
    required: true
  },
  serviceDetailsFile: {
    type: String,
    required: false
  },
  wsdlFile: {
    type: String,
    required: true
  },
  xsdFiles: {
    type: [],
    required: false
  }

});

mongoose.model("SoapService", SoapService);
