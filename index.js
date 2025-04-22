const express = require('express');
const path = require('path');

const app = express();

// Menyajikan folder public untuk file HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Jika ada route lain, tetap arahkan ke index.html
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export untuk digunakan Vercel
module.exports = app;
