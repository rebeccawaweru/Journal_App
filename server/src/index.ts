import express from 'express';
import authRoutes from './routes/auth'
const app = express();

app.use(express.json());
app.use('/auth', authRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});