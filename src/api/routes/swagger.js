const RestService = require("../../services/RestService");
const SoapService = require("../../services/SoapService");

const { generateHTML } = require('swagger-ui-express');



module.exports = () => {
    return async (req, res) => {

        const { serviceNameEng } = req.params

        let service

        service = await SoapService.getService(serviceNameEng)
        if (!service) {

            service = await RestService.getService(serviceNameEng)
        }

        if (!service) {
            return res.status(404).send()
        }
        const { swaggerFile } = service

        var html = generateHTML(JSON.parse(swaggerFile))
        res.send(html)

        return

    }
}

