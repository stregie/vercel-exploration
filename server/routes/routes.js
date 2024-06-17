const express = require ('express');
const router = express.Router();

const pages = require('../handlers/pages.js');

router.get('/', pages.home);
router.get('/subpage', pages.subpage);
router.get('/simpleapi', pages.simpleapi);

module.exports = router;