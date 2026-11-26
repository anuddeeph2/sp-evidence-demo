// Fictional demo. INTENTIONALLY UNSAFE patterns so CodeQL has something to report.
const express = require('express');
const _ = require('lodash');
const app = express();

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Unsafe: evaluates user input (CodeQL js/code-injection)
app.get('/calc', (req, res) => {
  const result = eval(req.query.expr);
  res.send(String(result));
});

// Unsafe: reflects user input into HTML (CodeQL js/reflected-xss)
app.get('/hello', (req, res) => {
  res.send('<h1>Hello ' + req.query.name + '</h1>');
});

app.get('/merge', (req, res) => {
  res.json(_.merge({}, JSON.parse(req.query.data || '{}')));
});

app.listen(8080);
