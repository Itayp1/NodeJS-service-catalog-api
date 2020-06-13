const mongoose = require("mongoose");

const PendingSoapServiceSchema = new mongoose.Schema({
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
  backendUrl: {
    type: String,
    required: true,
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
  serviceDetailsFileExist: {
    type: String,
    required: false
  },
  wsdlFileExist: {
    type: String,
    required: false
  },
  xsdFileExist: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['pendingAprove', 'Aproved', 'rejected', 'PendingDetails'],
    default: 'pendingAprove'
  },
  type: {
    type: String,
    enum: ['soap'],
    default: 'soap'



  }

});

mongoose.model("PendingSoapService", PendingSoapServiceSchema);
