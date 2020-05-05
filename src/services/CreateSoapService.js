const Service = require("./Service"),
  mongoose = require("mongoose"),
  PendingSoapServiceQery = mongoose.model("PendingSoapService"),
  SoapServiceQery = mongoose.model("SoapService");

// CError = require("../services/CustomError"),

module.exports = class SoapService extends Service {
  constructor({ wsdlFile, xsdFiles, ...properties }) {
    super(properties);
    this.wsdlFile = wsdlFile;
    this.xsdFiles = xsdFiles
  }

  async addService() {
    try {
      const { serviceNameHeb, serviceNameEng } = this

      const isExist = await SoapServiceQery.find({ $or: [{ serviceNameHeb }, { serviceNameEng }] })
      console.log(isExist)
      if (isExist.length > 0) {
        const err = new Error("duplicate service")
        err.status = 409
        throw err
      }
      const pendingSoapServiceQery = PendingSoapServiceQery(this)
      const result = await pendingSoapServiceQery.save();
      return result

    } catch (error) {
      const { code } = error
      if (code == 11000) {
        const err = new Error("duplicate service")
        err.status = 409
        throw err
      } else {
        throw error
      }

    }

  }
  async updateService(obj) {

    const { serviceNameEng } = this
    let result = await PendingSoapServiceQery.findOneAndUpdate(
      { serviceNameEng },
      {
        $set: obj
      }
    );
    return result




  }
  async getService(serviceNameEng) {
    let result = null


    if (serviceNameEng) {
      result = await PendingSoapServiceQery.find({ serviceNameEng });

    } else {

      result = await PendingSoapServiceQery.find();
    }
    return result



  }

  static async reject(id) {
    const result = await PendingSoapServiceQery.findByIdAndUpdate({ _id: id }, { $set: { status: "rejected" } })
    return result

  }
  static async aprove(id) {

    // eslint-disable-next-line no-unused-vars
    let { _doc: { status, ...details } } = await PendingSoapServiceQery.findByIdAndDelete(
      { _id: id }
    );
    console.log(details)
    const soapServiceQery = SoapServiceQery(details)

    const result = await soapServiceQery.save();

    return result

  }
  async pendingdetails(id) {
    const obj = { ...this, status: "pendingAprove" }
    const result = await PendingSoapServiceQery.findByIdAndUpdate({ _id: id }, { $set: obj })
    return result

  }
};
