const { Router } = require("express");
const { postLogin } = require("../controllers/auth");

const router = new Router();

router.post('/', postLogin);



module.exports = router