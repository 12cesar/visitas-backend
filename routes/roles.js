const { Router, request, response } = require("express");
const { getRoles } = require("../controllers/roles");


const router = Router();

router.get('/', getRoles)


module.exports = router