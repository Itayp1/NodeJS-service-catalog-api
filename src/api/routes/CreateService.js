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

router.post("/soap", async (req, res) => {
    const soapService = new CreateSoapService(req.body)
    const response = await soapService.addService()
    return res.json(response);

});




router.put("/rest", async (req, res) => {
    const restService = new CreateRestService(req.body)
    const response = await restService.updateService(req.body)
    return res.json(response);
});


router.post("/rest", upload.single('swaggerFile'), bodyParser.json()
    , async (req, res) => {



        // console.log(req.body.json)
        // let buff = Buffer.from(req.file.buffer);
        // let base64data = buff.toString('base64');
        // console.log(base64data)
        const swaggerFile = req.file.buffer.toString("utf8")
        const request = { ...JSON.parse(req.body.json), swaggerFile }


        const restService = new CreateRestService(request)
        const response = await restService.addService()
        return res.json(response);

    });







module.exports = router;
