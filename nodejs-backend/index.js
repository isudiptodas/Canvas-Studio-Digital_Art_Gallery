import express from 'express';
import cors from 'cors';
import validateEmail from './routes/validateEmail.js';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use(validateEmail);

app.listen(port, () => {
    console.log(`server started`);
});