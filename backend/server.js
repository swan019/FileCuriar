const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const db = require('./config/db');
const path = require('path');
// const cloudinary = require("./config/Cloudinary");
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for file uploads
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Connect to database
db.connect();


// Routes
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');
const viewDownloadPageRoute = require('./routes/viewDownloadPage')
const emailRouter = require('./routes/email');

// Mounting routes
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
app.use('/Vdownload', viewDownloadPageRoute);
app.use('/email', emailRouter);

// Activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
