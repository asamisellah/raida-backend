import express from 'express';
import debug from 'debug';
import passangersRoute from './routes/PassangersRoute.js';
import ridesRoute from './routes/RidesRoute.js';
import driversRoute from './routes/DriversRoute.js';

const app = express();

app.use(express.json());
app.use('/users', passangersRoute);
app.use('/rides', ridesRoute);
app.use('/drivers', driversRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});



