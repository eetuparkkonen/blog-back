import express, { Request, Response, Application } from 'express';
import { runMain } from 'module';
import mongoose, { connect } from 'mongoose';
import { BlogModel } from './schema';

const app: Application = express();
const port = 8000;

// MongoDB connect ja portin 8000 kuuntelu
mongoose
  .connect('mongodb+srv://eetuparkkonen:0659@fullstack-demo.nprou.mongodb.net/project?retryWrites=true&w=majority')
  .then(() => app.listen(port, () => console.log(`Connected to database and listening for port ${port}`)))
  .catch((err) => console.log(err));

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello my friend');
});

app.post('/', (req: Request, res: Response): void => console.log('gei'));

// Uuden blogin lisääminen MongoDB collectioniin
app.get('/add-blog', (req: Request, res: Response): void => {
  const blog = new BlogModel({
    name: 'Minä',
    email: 'Moi',
    text: 'this is my blog',
  });

  blog.save();
});
