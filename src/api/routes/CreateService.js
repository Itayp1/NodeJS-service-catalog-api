const router = require("express").Router();
const CreateRestService = require("../../services/CreateRestService");
const CreateSoapService = require("../../services/CreateSoapService");
var multer = require('multer')
const bodyParser = require("body-parser");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'C:/projects/react/service-ctalog-api/swaggers')
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.fieldname)
//     }
// })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })
// var upload = multer();
// require("express-async-errors");



router.get("/", async (req, res) => {

    const soapServices = await CreateSoapService.getService()
    const restServices = await CreateRestService.getService()
    const services = [...soapServices, ...restServices]
    return res.json(services);
});



router.put("/soap/reject/:id", async (req, res) => {
    const { id } = req.params
    const response = await CreateSoapService.reject(id)
    return res.json(response);
});

router.put("/soap/pendingdetails", async (req, res) => {
    const soapService = new CreateSoapService(req.body)
    const { _id } = req.body
    const response = await soapService.pendingdetails(_id)
    return res.json(response);
});

router.post("/soap", upload.fields([{ name: 'wsdlFile', maxCount: 1 }, { name: 'xsdFile', maxCount: 1 }, { name: 'serviceDetailsFile', maxCount: 1 }]), bodyParser.json(), async (req, res) => {
    const wsdlFileExist = req.files["wsdlFile"] ? "true" : "false"
    const xsdFileExist = req.files["xsdFile"] ? "true" : "false"
    const serviceDetailsFileExist = req.files["serviceDetailsFile"] ? "true" : "false"

    const request = { ...JSON.parse(req.body.json), wsdlFileExist, xsdFileExist, serviceDetailsFileExist }

    if (wsdlFileExist == "true") {
        await CreateRestService.saveFile(req.files["wsdlFile"][0], request.serviceNameEng, "wsdl")

    }

    if (xsdFileExist == "true") {

        await CreateRestService.saveFile(req.files["xsdFile"][0], request.serviceNameEng, "xsd")
    }
    if (serviceDetailsFileExist == "true") {

        await CreateRestService.saveFile(req.files["serviceDetailsFile"][0], request.serviceNameEng, "docx")
    }

    const soapService = new CreateSoapService(request)
    const response = await soapService.addService()
    return res.json(response);

});




router.put("/rest", async (req, res) => {
    const restService = new CreateRestService(req.body)
    const response = await restService.updateService(req.body)
    return res.json(response);
});


router.post("/rest", upload.fields([{ name: 'swaggerFile', maxCount: 1 }, { name: 'serviceDetailsFile', maxCount: 1 }]), bodyParser.json()
    , async (req, res) => {

        const swaggerFileExist = req.files["swaggerFile"] ? "true" : "false"
        const serviceDetailsFileExist = req.files["serviceDetailsFile"] ? "true" : "false"
        const request = { ...JSON.parse(req.body.json), swaggerFileExist, serviceDetailsFileExist }
        const restService = new CreateRestService(request)
        const response = await restService.addService()
        if (swaggerFileExist == "true") {
            await CreateRestService.saveFile(req.files["swaggerFile"][0], request.serviceNameEng, "json")

        }

        if (serviceDetailsFileExist == "true") {

            await CreateRestService.saveFile(req.files["serviceDetailsFile"][0], request.serviceNameEng, "docx")
        }
        return res.json(response);

    });







module.exports = router;
