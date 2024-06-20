const express = require ('express');
const router = express.Router();

const pages = require('../handlers/pages.js');
const postgres = require('../handlers/postgres.js');

router.get('/', pages.home);
router.get('/A01-common-components', pages.A01);
router.get('/B01-postgresql', pages.B01);

router.get('/B01-postgresql/fetch-text', postgres.fetchText);
router.get('/B01-postgresql/select-all', postgres.selectAll);
router.post('/B01-postgresql/insert-data', postgres.insertData);
router.post('/B01-postgresql/delete-by-name', postgres.deleteByName);

module.exports = router;