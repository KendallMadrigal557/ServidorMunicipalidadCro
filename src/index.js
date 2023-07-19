const express = require('express');
const dbconnect = require('./config/db.config');
const app = express();
const port = process.env.PORT || 3001;
const placeRouter = require('./routes/place.routes');
const multer = require('multer');
const path = require('path');

app.use(express.json());

app.use('/api', placeRouter);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'Error al subir el archivo. Verifica el formato y vuelve a intentarlo.' });
  } else if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

app.get('/', (req, res) => {
  res.send("Welcome to my API");
});

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log('Server listening on port', port);
});

dbconnect();

module.exports = app;
