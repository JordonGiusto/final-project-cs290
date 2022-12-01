const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../glTesting')));

while (port < 4000) {
    try {
        app.listen(port, () => console.log(`Listening on port ${port}`));
        break;
    } catch (err) {
        port++;
    }
}
