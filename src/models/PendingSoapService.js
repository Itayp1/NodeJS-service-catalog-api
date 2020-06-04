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
