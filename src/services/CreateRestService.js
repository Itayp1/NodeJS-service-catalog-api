const Service = require("./Service"),
  emitter = require("../subscribers/index"),
  { APROVE_URL_REST: aprovmentUrl } = require("../../server.config"),

  mongoose = require("mongoose"),
  fs = require("fs"),
  fsPromises = fs.promises,

  PendingRestServiceQery = mongoose.model("PendingRestService"),
  RestServiceQery = mongoose.model("RestService");


module.exports = class RestService extends Service {
  constructor({ swaggerFileExist, serviceDetailsFileExist, ...properties }) {
    super(properties);
    this.swaggerFileExist = swaggerFileExist
    this.serviceDetailsFileExist = serviceDetailsFileExist
  }

  static async saveFile(file, serviceNameEng, type) {

    // eslint-disable-next-line no-undef
    const base = `${process.cwd()}/uploads/services/${serviceNameEng}`
    // eslint-disable-next-line no-unused-vars
    const { fieldname, buffer } = file
    try {
      await fsPromises.mkdir(base)

    } catch (error) {
      if (error.errno == -4075) {
        console.log("folder exist ")
      }
      else {
        throw error
      }
    }

    switch (type) {
      case "docx":

        await fsPromises.writeFile(`${base}/${serviceNameEng}.docx`, buffer, () => { })
        break;

      case "xsd":

        await fsPromises.writeFile(`${base}/${serviceNameEng}.xsd`, buffer, () => { })
        break;
      case "wsdl":

        await fsPromises.writeFile(`${base}/${serviceNameEng}.wsdl`, buffer, () => { })
        break;

      case "json":

        await fsPromises.writeFile(`${base}/${serviceNameEng}.json`, buffer, () => { })
        break;
      default:
        break;
    }



  }
  async addService() {
    const { serviceNameHeb, serviceNameEng } = this

    const isExist = await RestServiceQery.find({ $or: [{ serviceNameHeb }, { serviceNameEng }] })
    if (isExist.length > 0) {
      const err = new Error("duplicate service")
      err.status = 409
      throw err
    }
    const pendingRestServiceQery = PendingRestServiceQery(this)

    try {

      const result = await pendingRestServiceQery.save()

      emitter.emit("user-aprovment", { aprovmentUrl, ...result._doc });
      return result

    } catch (error) {
      const { code } = error;
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
    let result = await PendingRestServiceQery.findOneAndUpdate(
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
      result = await PendingRestServiceQery.findOne({ _id: id });

    } else {

      result = await PendingRestServiceQery.find();
    }
    return result



  }

  static async reject(id) {
    const result = await PendingRestServiceQery.findByIdAndUpdate({ _id: id }, { $set: { status: "rejected" } })
    return result

  }
  async aprove(id) {

    // eslint-disable-next-line no-unused-vars

    const { serviceDetailsFileExist, swaggerFileExist, ...other } = await PendingRestServiceQery.findByIdAndDelete(
      { _id: id }
    );
    if (!other) {
      throw new Error("service not found")
    }
    const soapServiceQery = RestServiceQery({ ...this, serviceDetailsFileExist, swaggerFileExist })
    const result = await soapServiceQery.save();

    return result

  }
  async pendingdetails(id) {
    const obj = { ...this, status: "pendingAprove" }
    const result = await PendingRestServiceQery.findByIdAndUpdate({ _id: id }, { $set: obj })
    return result

  }

};
