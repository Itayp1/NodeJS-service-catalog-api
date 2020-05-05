module.exports = class Service {
  constructor({ serviceNameHeb, serviceNameEng, backendUrlQA, backendUrlPRD, businessOwner, techOwner, serviceDetails, serviceDetailsFile }) {
    // prettier-ignore
    this.serviceNameHeb = serviceNameHeb,
      this.serviceNameEng = serviceNameEng,
      this.backendUrlQA = backendUrlQA,
      this.backendUrlPRD = backendUrlPRD,
      this.businessOwner = businessOwner,
      this.techOwner = techOwner,
      this.serviceDetails = serviceDetails,
      this.serviceDetailsFile = serviceDetailsFile;
  }
};


