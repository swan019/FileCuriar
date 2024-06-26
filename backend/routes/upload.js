const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary'); 
const File = require('../model/File'); 
const path = require('path');
const fs = require('fs');
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        // Validate that files were uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.file;
        const tempDir = path.join(__dirname, '../temp/');
        const tempFilePath = path.join(tempDir, file.name);

        // Ensure temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Save the file temporarily
        await file.mv(tempFilePath);

        try {
            const result = await cloudinary.uploader.upload(tempFilePath, {
                folder: 'FileCourier'
            });

            // Delete the temp file after upload
            fs.unlinkSync(tempFilePath);

            const newFile = new File({ url: result.secure_url });
            await newFile.save();

            res.json({ url: result.secure_url, id: newFile._id });

        } catch (cloudinaryError) {
            // Ensure temp file is deleted if upload fails
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            console.error('Cloudinary upload error:', cloudinaryError);
            res.status(500).send('Error uploading file to Cloudinary.');
        }

    } catch (fileUploadError) {
        console.error('File upload error:', fileUploadError);
        res.status(500).send('Server error during file upload.');
    }
});

module.exports = router;
