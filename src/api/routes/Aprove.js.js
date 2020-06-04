const router = require("express").Router();
const CreateRestService = require("../../services/CreateRestService");
const CreateSoapService = require("../../services/CreateSoapService");

require("express-async-errors");



router.put("/soap/:id", async (req, res) => {
    const { id } = req.params
    const soapService = new CreateSoapService(req.body)
    const response = await soapService.aprove(id)

    return res.json(response);
});


router.put("/rest/:id", async (req, res) => {
    const { id } = req.params
    const restService = new CreateRestService(req.body)
    const response = await restService.aprove(id)
    return res.json(response);
});







module.exports = router;
