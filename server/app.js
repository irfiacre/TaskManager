import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => res.status(400).json({
  status: 400,
  error: ' PAGE NOT FOUND ',

}));

export default app;