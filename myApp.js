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

// TASK 5: Browsers can use content or MIME sniffing to override the Content-Type header 
// of a response to guess and process the data using an implicit content type. 
// This middleware sets the X-Content-Type-Options header to nosniff, 
// instructing the browser to not bypass the provided Content-Type
app.use(helmet.noSniff());

// TASK 6: Some web applications will serve untrusted HTML for download
// This middleware sets the X-Download-Options header to noopen. 
// This will prevent IE users from executing downloads in the trusted site’s context. 
app.use(helmet.ieNoOpen());

// TASK 7: Strict Transport Security (HSTS) 
// protect websites against protocol downgrade attacks and cookie hijacking. 
// you can ask user’s browsers to avoid using insecure HTTP
const timeInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));

// TASK 8: DNS Prefetching

app.use(helmet.dnsPrefetchControl());

// TASK 9: 
// If you are releasing an update for your website, 
// and you want the users to always download the
// newer version, you can (try to) disable caching on client’s browser.
app.use(helmet.noCache())

// TASK 10:
//  By setting and configuring a Content Security Policy you can prevent 
// the injection of anything unintended into your page. 
// This will protect your app from XSS vulnerabilities, undesired tracking, 
// malicious frames, and much more.

app.use(helmet.contentSecurityPolicy({
  directives: {
  defaultSrc: ["'self'"],
  srciptSrc: ["'self'", 'trusted-cdn.com']
  },
})
);







































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