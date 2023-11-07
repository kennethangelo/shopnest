const express = require('express');
const app = express();

//process listening that env using generate env PORT (if exists) or port 5000 so that client can access the server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));