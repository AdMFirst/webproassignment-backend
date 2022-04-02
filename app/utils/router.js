const cors = require('cors')

const router = require("express").Router();
router.all('*', cors());

export default router