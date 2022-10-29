const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./api/routes/routes');


//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.set('view engine','ejs');
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {
       maxAge: 1000 * 60 * 60 * 24
    },
    resave: false
  }));
//routes
app.use('/', routes);

app.listen(3000);
console.log('Server on port 3000');