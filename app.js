const express = require('express');
const cors = require('cors');

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Configuration for deployment
// app.use(cors({
//     origin: 'your-deployed-app-url',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

//localhost
app.use(cors());

app.get('/', function (req, res) {
    res.send({
        message: "working"
    });
});

module.exports = app;