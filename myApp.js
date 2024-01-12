const express = require('express');
const app = express();

// TASK 2: Hackers can exploit known vulnerabilities in Express/Node 
// if they see that your site is powered by Express. 
// X-Powered-By: Express is sent in every request coming from Express by default.
const helmet = require('helmet')
app.use(helmet.hidePoweredBy());

// TASK 3: Your page could be put in a <frame> or <iframe> without your consent. 
// This can result in clickjacking attacks
// It restricts who can put your site in a frame 
// It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.
app.use(helmet.frameguard({action: 'deny'}));

// TASK 4: Cross-site scripting (XSS) is a frequent type of attack 
// where malicious scripts are injected into vulnerable pages, 
// with the purpose of stealing sensitive data like session cookies, or passwords.
// The X-XSS-Protection HTTP header is a basic protection. 
// The browser detects a potential injected script using a heuristic filter. 
// If the header is enabled, the browser changes the script code, neutralizing it
app.use(helmet.xssFilter());









































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