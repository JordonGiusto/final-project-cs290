const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 3001;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);   
});