const Service = require("./Service"),
  mongoose = require("mongoose"),
  RestServiceQery = mongoose.model("RestService");
// CError = require("../services/CustomError"),

module.exports = class RestService extends Service {
  constructor({ swaggerFile, ...properties }) {
    super(properties);
    this.swaggerFile = swaggerFile;
  }

  async addService() {
    const restServiceQery = RestServiceQery(this)
    try {
      const result = await restServiceQery.save();
      return result

    } catch ({ code, errmsg }) {
      console.log(errmsg)
      if (code == 11000) {
        const err = new Error("duplicate service")
        err.status = 409
        throw err
      } else {
        throw code
      }

    }

  }

  async updateService(obj) {

    const { serviceNameEng } = this
    let result = await RestServiceQery.findOneAndUpdate(
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
      result = await RestServiceQery.find({ serviceNameEng });

    } else {

      result = await RestServiceQery.find();
    }
    return result





  }

};
