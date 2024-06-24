import express from 'express';
import * as pages from '../handlers/pages.js';
import * as postgres from '../handlers/postgres.js';
import * as blob from '../handlers/blob.js';

const router = express.Router();

router.get('/', pages.home);
router.get('/A01-common-components', pages.A01);
router.get('/B01-postgresql', pages.B01);
router.get('/B02-blob', pages.B02);

router.get('/B01-postgresql/fetch-text', postgres.fetchText);
router.get('/B01-postgresql/select-all', postgres.selectAll);
router.post('/B01-postgresql/insert-data', postgres.insertData);
router.post('/B01-postgresql/delete-by-name', postgres.deleteByName);

router.get('/B02-blob/file-list', blob.getFileList);
router.delete('/B02-blob/delete-file/', blob.deleteFile);
router.put('/B02-blob/upload-local-file', blob.uploadLocalFile);
router.put('/B02-blob/upload-file', blob.uploadFile);

export default router;