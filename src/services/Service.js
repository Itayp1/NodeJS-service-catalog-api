module.exports = class Service {
  constructor({ serviceNameHeb, serviceNameEng, backendUrl, businessOwner, techOwner, serviceDetails, serviceDetailsFile }) {
    // prettier-ignore
    this.serviceNameHeb = serviceNameHeb,
      this.serviceNameEng = serviceNameEng,
      this.backendUrl = backendUrl,
      this.businessOwner = businessOwner,
      this.techOwner = techOwner,
      this.serviceDetails = serviceDetails,
      this.serviceDetailsFile = serviceDetailsFile;

  }
};


