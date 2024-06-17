const express = require ('express');
const router = express.Router();

const pages = require('../handlers/pages.js');

router.get('/', pages.home);
router.get('/A01-common-components', pages.A01);
router.get('/B01-postgresql', pages.B01);

module.exports = router;