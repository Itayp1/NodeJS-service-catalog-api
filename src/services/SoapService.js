const Service = require("./Service"),
  mongoose = require("mongoose"),
  SoapServiceQery = mongoose.model("SoapService");
// CError = require("../services/CustomError"),

module.exports = class SoapService extends Service {
  constructor({ wsdlFile, xsdFiles, ...properties }) {
    super(properties);
    this.wsdlFile = wsdlFile;
    this.xsdFiles = xsdFiles
    this.type = "soap"
  }

  async addService() {
    try {
      const soapServiceQery = SoapServiceQery(this)
      const result = await soapServiceQery.save();
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
    let result = await SoapServiceQery.findOneAndUpdate(
      { serviceNameEng },
      {
        $set: obj
      }
    );
    return result




  }
  static async getService(serviceNameEng) {
    let result = null


    if (serviceNameEng) {
      result = await SoapServiceQery.findOne({ serviceNameEng });

    } else {

      result = await SoapServiceQery.find();
    }
    return result



  }
};
