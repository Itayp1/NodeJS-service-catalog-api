const router = require("express").Router();
const CreateRestService = require("../../services/CreateRestService");
const CreateSoapService = require("../../services/CreateSoapService");

require("express-async-errors");



router.get("/", async (req, res) => {

    const soapServices = await CreateSoapService.getService()
    const restServices = await CreateRestService.getService()
    const services = [...soapServices, ...restServices]
    return res.json(services);
});



router.get("/soap/:id", async (req, res) => {

    const { id } = req.params
    const { serviceNameHeb, serviceNameEng, backendUrl, businessOwner, techOwner, serviceDetails } = await CreateSoapService.getService(id)

    return res.json({ serviceNameHeb, serviceNameEng, backendUrl, businessOwner, techOwner, serviceDetails });
});



router.get("/rest/:id", async (req, res) => {

    const { id } = req.params
    const { serviceNameHeb, serviceNameEng, backendUrl, businessOwner, techOwner, serviceDetails } = await CreateRestService.getService(id)
    console.log(serviceNameHeb)
    return res.json({ serviceNameHeb, serviceNameEng, backendUrl, businessOwner, techOwner, serviceDetails });
});



module.exports = router;
