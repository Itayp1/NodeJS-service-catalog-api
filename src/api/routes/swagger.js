const { path } = require('app-root-path');

const { generateHTML } = require('swagger-ui-express');



module.exports = function () {
    return function (req, res) {

        const { serviceNameEng } = req.params

        const swaggerDocument = require(`${path}/swaggers/${serviceNameEng}.json`);

        var html = generateHTML(swaggerDocument)
        res.send(html)

    }
}

