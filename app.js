const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./app_server/routes/index');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Travlr running on http://localhost:${PORT}`);
});
