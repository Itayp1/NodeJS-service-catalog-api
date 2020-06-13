module.exports = class Service {
  constructor({ serviceNameHeb, serviceNameEng, backendUrl, businessOwner, techOwner, serviceDetails, serviceDetailsFileExist }) {
    // prettier-ignore
    this.serviceNameHeb = serviceNameHeb,
      this.serviceNameEng = serviceNameEng,
      this.backendUrl = backendUrl,
      this.businessOwner = businessOwner,
      this.techOwner = techOwner,
      this.serviceDetails = serviceDetails,
      this.serviceDetailsFileExist = serviceDetailsFileExist;

  }
};


