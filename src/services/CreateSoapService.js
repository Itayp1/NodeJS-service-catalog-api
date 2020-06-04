const Service = require("./Service"),
  emitter = require("../subscribers/index"),
  mongoose = require("mongoose"),
  { APROVE_URL_SOAP: aprovmentUrl } = require("../../server.config"),

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

      emitter.emit("user-aprovment", { aprovmentUrl, ...result._doc });

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

  static async getService(id) {
    let result = null


    if (id) {
      result = await PendingSoapServiceQery.findOne({ _id: id });

    } else {

      result = await PendingSoapServiceQery.find();
    }
    return result



  }

  static async reject(id) {
    const result = await PendingSoapServiceQery.findByIdAndUpdate({ _id: id }, { $set: { status: "rejected" } })
    return result

  }
  async aprove(id) {

    // eslint-disable-next-line no-unused-vars
    await PendingSoapServiceQery.findByIdAndDelete(
      { _id: id }
    );
    const soapServiceQery = SoapServiceQery(this)

    const result = await soapServiceQery.save();

    return result

  }
  async pendingdetails(id) {
    const obj = { ...this, status: "pendingAprove" }
    const result = await PendingSoapServiceQery.findByIdAndUpdate({ _id: id }, { $set: obj })
    return result

  }
};
