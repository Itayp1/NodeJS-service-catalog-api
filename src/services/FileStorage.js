const fs = require("fs"),
    fsPromises = fs.promises;

const saveFile = async (file, serviceNameEng, type, i) => {

    // eslint-disable-next-line no-undef
    const base = `${process.cwd()}/uploads/services/${serviceNameEng}`
    const { buffer } = file
    await fsPromises.mkdir(base)

    if (type == "xsd" && i) {

        // eslint-disable-next-line no-unused-vars
        await fsPromises.writeFile(`${base}/${serviceNameEng}${i}.xsd`, buffer, (res) => { })
    } else {
        // eslint-disable-next-line no-unused-vars
        await fsPromises.writeFile(`${base}/${serviceNameEng}.${type}`, buffer, (res) => { })

    }
}


const readFile = async (serviceNameEng, type) => {
    // eslint-disable-next-line no-undef
    const base = `${process.cwd()}/uploads/services/${serviceNameEng}`

    const file = await fsPromises.readFile(`${base}/${serviceNameEng}.${type}`)
    return file
}

module.exports = {
    saveFile,
    readFile
}