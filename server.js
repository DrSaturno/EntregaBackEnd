const express = require('express');
const app = express();
const port = 3001;

const moviesRouter = require('./routes/peliculas');
const actorsRouter = require('./routes/actores');
const directorsRouter = require('./routes/directores');
const rentalsRouter = require('./routes/alquileres');

app.use(express.json());
app.use('/peliculas', moviesRouter);
app.use('/actores', actorsRouter);
app.use('/directores', directorsRouter);
app.use('/alquileres', rentalsRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});

