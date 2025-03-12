const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'blevamawebsite@gmail.com',
        pass: 'eddn tqau wwii umuq',
    },
    tls: {
        rejectUnauthorized: false,
    },
});


// Email endpoint
app.post('/send-email', (req, res) => {

    const { to, subject, html } = req.body;
    const mailOptions = {
        from: 'blevamawebsite@gmail.com',
        to,
        subject,
        html,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending email', error: error.toString() });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });    
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});