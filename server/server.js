const express = require('express');
const userRoutes = require('./src/users/routes');


const app = express();
const port = 8080;

app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, () => console.log(`app listening at port ${port}`));
