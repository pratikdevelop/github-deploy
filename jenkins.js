const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/mydatabase');

// Initialize GridFS stream
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Configure storage engine for multer
const storage = new GridFsStorage({
  url: 'mongodb://localhost/mydatabase',
  file: (req, file) => {
    return {
      filename: file.originalname,
      metadata: {
        uploader: req.user.id,
        uploadedAt: Date.now()
      }
    };
  }
});

// Initialize multer with storage engine
const upload = multer({ storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully');
});

// File download endpoint
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  gfs.files.findOne({ filename }, (err, file) => {
    if (!file) {
      res.status(404).send('File not found');
      return;
    }
    const readstream = gfs.createReadStream(file.filename);
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    readstream.pipe(res);
  });
});
