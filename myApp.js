const express = require('express');
const app = express();

// TASK 2: Hackers can exploit known vulnerabilities in Express/Node 
// if they see that your site is powered by Express. 
// X-Powered-By: Express is sent in every request coming from Express by default.

app.use(helmet.hidePoweredBy());













































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});