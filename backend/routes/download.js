const express = require('express');
const axios = require('axios');
const router = express.Router();
const File = require('../model/File'); // Assuming you have a File model

router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send('File not found');
    }

    // Get the file URL from Cloudinary
    const fileUrl = file.url;

    // Fetch the file from Cloudinary
    const response = await axios.get(fileUrl, { responseType: 'stream' });

    // Set headers to force download
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(fileUrl.split('/').pop()));
    res.setHeader('Content-Type', response.headers['content-type']);

    // Pipe the file stream to the response
    response.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
