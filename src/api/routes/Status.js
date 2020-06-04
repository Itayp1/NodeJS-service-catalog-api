const router = require("express").Router();
const Status = require("../../services/Status");

require("express-async-errors");





router.get("/:type/:serviceNameEng", async (req, res) => {
    const { serviceNameEng, type } = req.params

    const service = await Status(type, serviceNameEng)




    return res.json(service);
});





module.exports = router;
