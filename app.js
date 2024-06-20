import 'dotenv/config';
import express from 'express';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import routes from './server/routes/routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(import.meta.dirname);
console.log(path.join(__dirname, 'server', 'views'));

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server', 'views'));
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use('/', routes);

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;