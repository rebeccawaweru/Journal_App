import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import journalRoutes from './routes/journal';

//configure dotenv to load variables from the .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes)
app.use('/journals', journalRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});