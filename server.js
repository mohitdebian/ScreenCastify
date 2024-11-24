// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, `./uploads/${req.file.originalname}`);

  fs.rename(tempPath, targetPath, err => {
    if (err) return handleError(err, res);
    res.status(200).json({ message: 'File uploaded successfully' });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
