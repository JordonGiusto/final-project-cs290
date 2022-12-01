const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 4001;

const app = express();

app.use(express.static(path.join(__dirname, '../glTesting')));


app.listen(port, () => console.log(`Listening on port ${port}`));

