const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, './dist/assignment-app')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/assignment-app/index.html'));
});

// Ajouter le type MIME approprié pour les fichiers JavaScript
app.get('*.js', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript');
  next();
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 8081, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 8081}`);
});
