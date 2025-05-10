
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'menu.html'));
});
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.post('/api/contact', (req, res) => {
    console.log('Received contact form submission:');
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        console.error('Missing form data');
        return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    res.status(200).json({ message: 'Message received successfully!' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});