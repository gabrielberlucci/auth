import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
