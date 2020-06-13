


const mongoose = require("mongoose"),
    PendingSoapService = mongoose.model("PendingSoapService"),
    PendingRestService = mongoose.model("PendingRestService");


const getStatus = async (type, serviceNameEng) => {

    let response
    if (type === 'rest') {

        response = await PendingRestService.findOne({ serviceNameEng });

    } else {

        response = await PendingSoapService.findOne({ serviceNameEng });
    }
    return response

}


module.exports = getStatus

