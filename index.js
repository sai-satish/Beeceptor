const express = require('express');
const { readFileSync } = require('fs');
const user_db = require('./database_connection.js');

const app = express();

app.use(express.json());
app.use(express.static('./'));


const portNumber = 5000;
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}: http://localhost:${portNumber}`);
});

// Routes
app.get('/signIn', (req, res) => {
    const fileContent = readFileSync('signin.html', 'utf8');
    res.status(200).send(fileContent);
});


app.post('/login', (req, res) => {
    const data = req.body;
    // console.log("Received /login data:", data);

    user_db.connect_to_API('https://demo-server3.free.beeceptor.com/signin', data)
        .then((login_data) => {
            // console.log("Login result:", login_data);
            res.status(200).json(login_data);
        })
        .catch((error) => {
            console.error("Error during /login:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.get('/signUp', (req, res) => {
    const fileContent = readFileSync('signup.html', 'utf8');
    res.status(200).send(fileContent);
});

app.get('/', (req, res) => {
    res.status(200).send('Home Page');
});
