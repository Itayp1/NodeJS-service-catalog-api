const mongoose = require("mongoose");

const PendingRestServiceSchema = new mongoose.Schema({
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


  swaggerFileExist: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['pendingAprove', 'Aproved', 'rejected', 'PendingDetails', "finished"],
    default: 'pendingAprove'
  },
  type: {
    type: String,
    enum: ['rest'],
    default: 'rest'


  }
});

mongoose.model("PendingRestService", PendingRestServiceSchema);
