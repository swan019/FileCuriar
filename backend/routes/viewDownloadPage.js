const express = require('express');
const router = express.Router();
const File = require('../model/File'); // Assuming you have a File model

router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send('File not found');
    }

    res.render('download', { fileId: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
