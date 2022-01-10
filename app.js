const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const index_routes = require('./routes/index');
//ejs 
app.use(expressLayouts);
app.set('view engine','ejs');

//routes
app.get('/', index_routes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT} `));

