require("dotenv").config();
const express = require('express');
const router = express.Router();
const File = require('../model/File'); // Assuming you have a File model
const sendMail = require('../servises/emailService');
const mailTemplate = require('../servises/mailTemplet');

router.post('/send', async (req, res) => {
  const { id, emailTo, emailFrom } = req.body;

  if (!emailTo || !emailFrom) {
    return res.status(422).json({ error: 'All fields are required except expiry.' });
  }

  try {
    // Fetch file from the database
    console.log("befor DB");
    const file = await File.findOne({ _id: id });
    console.log("after DB");

    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    // if (file.sender) {
    //   return res.status(422).json({ error: 'Email already sent once.' });
    // }

    file.sender = emailFrom;
    file.receiver = emailTo;
    await file.save();

    // Prepare email content
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: 'FileCuriar file sharing',
      text: `${emailFrom} shared a file with you.`,
      html: mailTemplate({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/Vdownload/${file.id}?source=email`,
        size: `${(file.size / 1000).toFixed(2)} KB`,
      }),
    };

    // Send email
    await sendMail(mailOptions);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
