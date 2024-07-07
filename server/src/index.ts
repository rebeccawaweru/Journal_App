import express from 'express';
import authRoutes from './routes/auth';
import journalRoutes from './routes/journal';
const app = express();

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/journals', journalRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});