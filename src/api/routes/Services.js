const router = require("express").Router();
const RestService = require("../../services/RestService");
const SoapService = require("../../services/SoapService");

require("express-async-errors");





router.get("/", async (req, res) => {

    const soapServices = await SoapService.getService()
    const restServices = await RestService.getService()
    const services = [...soapServices, ...restServices]
    return res.json(services);
});


router.get("/soap", async (req, res) => {
    const soapService = new SoapService(req.body)
    const response = await soapService.getService()
    if (response == null) {
        return res.status(404).send()

    }
    return res.json(response);
});

router.get("/soap/:serviceNameEng", async (req, res) => {

    const { serviceNameEng } = req.params

    const response = await SoapService.getService(serviceNameEng)
    if (response == null) {
        return res.status(404).send()

    }
    return res.json(response);
});





router.get("/rest", async (req, res) => {
    const restService = new RestService(req.body)
    const response = await restService.getService()
    return res.json(response);
});

router.get("/rest/:serviceNameEng", async (req, res) => {

    const { serviceNameEng } = req.params
    const response = await RestService.getService(serviceNameEng)
    return res.json(response);
});







module.exports = router;
