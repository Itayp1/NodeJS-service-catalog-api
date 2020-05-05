const router = require("express").Router();
const CreateRestService = require("../../services/CreateRestService");
const CreateSoapService = require("../../services/CreateSoapService");

require("express-async-errors");




router.get("/soap", async (req, res) => {
    const soapService = new CreateSoapService(req.body)
    const response = await soapService.getService()
    return res.json(response);
});

router.get("/soap/:id", async (req, res) => {

    const { id } = req.params
    const soapService = new CreateSoapService(req.body)
    const response = await soapService.getService(id)
    return res.json(response);
});

router.put("/soap/aprove/:id", async (req, res) => {
    const { id } = req.params
    const response = await CreateSoapService.aprove(id)
    return res.json(response);
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




router.get("/rest", async (req, res) => {
    const restService = new CreateRestService(req.body)
    const response = await restService.getService()
    return res.json(response);
});

router.get("/rest/:id", async (req, res) => {

    const { id } = req.params
    const restService = new CreateRestService(req.body)
    const response = await restService.getService(id)
    return res.json(response);
});

router.put("/rest", async (req, res) => {
    const restService = new CreateRestService(req.body)
    const response = await restService.updateService(req.body)
    return res.json(response);
});


router.post("/rest", async (req, res) => {
    const restService = new CreateRestService(req.body)
    const response = await restService.addService()
    return res.json(response);
});







module.exports = router;
