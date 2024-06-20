import 'dotenv/config';
import express from 'express';
import ejs from 'ejs';
import routes from './server/routes/routes.js';

const app = express();

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', './server/views');
app.use(express.static('./public'));
app.use(express.json());
app.use('/', routes);

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;