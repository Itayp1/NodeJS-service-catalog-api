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
  swaggerFile: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['pendingAprove', 'Aproved', 'rejected', 'PendingDetails'],
    default: 'pendingAprove'
  }
});

mongoose.model("PendingRestService", PendingRestServiceSchema);
