
const FileStorage = require("../../services/FileStorage");

const { generateHTML } = require('swagger-ui-express');



module.exports = () => {
    return async (req, res) => {

        const { serviceNameEng } = req.params




        const swaggerFile = await FileStorage.readFile(serviceNameEng, "json")


        if (!swaggerFile) {
            return res.status(404).send()
        }


        var html = generateHTML(JSON.parse(swaggerFile))
        res.send(html)

        return

    }
}

