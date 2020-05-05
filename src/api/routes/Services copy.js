const router = require("express").Router();
const RestService = require("../../services/RestService");
const SoapService = require("../../services/SoapService");

require("express-async-errors");

const services = {
    Rest: [
        {
            serviceNameHeb: "תיasdsaוק",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "המרת מסמכים ",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "קבלת נתוני פםנasdasdסיה",
            serviceNameEng: "GETPENTION",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "טasdasdוקן",
            serviceNameEng: "GENERATE JWT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "תשasdadsלום ",
            serviceNameEng: "PAYNEBT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "שלית מיasdasיל",
            serviceNameEng: "SEND MAIL",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "תasdasיוק",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "המרת מסמכים ",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "קבלת נתוני פםasdsaנסיה",
            serviceNameEng: "GETPENTION",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "טasdasdוקן",
            serviceNameEng: "GENERATE JWT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "תשasdasdלום ",
            serviceNameEng: "PAYNEBT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "שלית asdasמייל",
            serviceNameEng: "SEND MAIL",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "תיוק",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "המרת מסasdמכים ",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "קבלת נתוני פםנasdסיה",
            serviceNameEng: "GETPENTION",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "טוקן",
            serviceNameEng: "GENERATE JWT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "תשasdלום ",
            serviceNameEng: "PAYNEBT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "שלית מייל",
            serviceNameEng: "SEND MAIL",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "תsadיוק",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "המרת מסמכים ",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "קבלת נתוני פםasdנסיה",
            serviceNameEng: "GETPENTION",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "טוקן",
            serviceNameEng: "GENERATE JWT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "תשלום4234 ",
            serviceNameEng: "PAYNEBT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "שלית מייל234",
            serviceNameEng: "SEND MAIL",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "תasdיוק",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "המרת מסמכים23 ",
            serviceNameEng: "filenet",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "קבלת נתוני פםנsadסיה12",
            serviceNameEng: "GETPENTION",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        },
        {
            serviceNameHeb: "טוקן",
            serviceNameEng: "GENERATE JWT2",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לתיוק מסמכים"
        },
        {
            serviceNameHeb: "תשלsasום 2",
            serviceNameEng: "PAYNEBT",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "שירות לקבלת מסמכי אופטי"
        },
        {
            serviceNameHeb: "שלית מייל1",
            serviceNameEng: "SEND MAIL",
            serviceUrl: "http://localhost:3000/api/services/",
            details: "קבלת נתוני פניסה של מבוטחים"
        }
    ]
}


router.get("/", (req, res) => {
    return res.json(services);
});


router.get("/soap", async (req, res) => {
    const soapService = new SoapService(req.body)
    const response = await soapService.getService()
    return res.json(response);
});

router.get("/soap/:serviceNameEng", async (req, res) => {

    const { serviceNameEng } = req.params
    const soapService = new SoapService(req.body)
    const response = await soapService.getService(serviceNameEng)
    return res.json(response);
});
router.put("/soap", async (req, res) => {
    const soapService = new SoapService(req.body)
    const response = await soapService.updateService(req.body)
    return res.json(response);
});


router.post("/soap", async (req, res) => {
    const soapService = new SoapService(req.body)
    const response = await soapService.addService()
    return res.json(response);

});




router.get("/rest", async (req, res) => {
    const restService = new RestService(req.body)
    const response = await restService.getService()
    return res.json(response);
});

router.get("/rest/:serviceNameEng", async (req, res) => {

    const { serviceNameEng } = req.params
    const restService = new RestService(req.body)
    const response = await restService.getService(serviceNameEng)
    return res.json(response);
});

router.put("/rest", async (req, res) => {
    const restService = new RestService(req.body)
    const response = await restService.updateService(req.body)
    return res.json(response);
});


router.post("/rest", async (req, res) => {
    const restService = new RestService(req.body)
    const response = await restService.addService()
    return res.json(response);
});







module.exports = router;
