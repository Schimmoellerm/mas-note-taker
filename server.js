const express = require('express');

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));