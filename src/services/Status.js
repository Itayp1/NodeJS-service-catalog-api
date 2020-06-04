


const mongoose = require("mongoose"),
    PendingSoapService = mongoose.model("PendingSoapService"),
    PendingRestService = mongoose.model("PendingRestService");


const getStatus = async (type, serviceNameEng) => {

    let response
    if (type === 'rest') {
        console.log(type, serviceNameEng)

        response = await PendingRestService.findOne({ serviceNameEng });
        console.log(response)

    } else {

        response = await PendingSoapService.findOne({ serviceNameEng });
    }
    return response

}


module.exports = getStatus

