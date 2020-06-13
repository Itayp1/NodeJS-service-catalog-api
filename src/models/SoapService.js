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
  backendUrl: {
    type: String,
    required: true,
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
  serviceDetailsFileExist: {
    type: String,
    required: false
  },
  xsdFileExist: {
    type: String,
    required: false
  },
  wsdlFileExist: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['soap'],
    default: 'soap'
  }

});

mongoose.model("SoapService", SoapService);
