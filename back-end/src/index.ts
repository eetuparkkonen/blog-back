import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import { BlogModel } from './models/blogModel';
import cors from 'cors';
import passport from 'passport';
import './services/passport-setup';
import cookieSession from 'cookie-session';
import { checkAuthentication } from './middleware/isAuthenticated';
import bodyParser from 'body-parser';

const app: Application = express();
const port = 8000;

// osoite josta apia voi kutsua (react front on portissa 3000)
//const allowedOrigins = [];

const options: cors.CorsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		// aika millisekunneissa kauanko keksi "elää"
		maxAge: 60 * 60 * 60,
		keys: [process.env.keys!],
		name: 'sid',
	})
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connect ja portin 8000 kuuntelu
mongoose
	.connect(process.env.mongoDBConnection!) // ! tarkoittaa ei tyypistystä
	.then(() => app.listen(port, () => console.log(`Connected to database and listening for port ${port}`)))
	.catch((err) => console.log(err));

app.get('/posts', (req: Request, res: Response) => {
	BlogModel.find({}, (err, blog) => {
		if (err) {
			console.log(err);
		} else {
			res.send(blog);
		}
	});
});

// Uuden blogin lisääminen MongoDB collectioniin
// app.get('/add-blog', (req: Request, res: Response) => {
// 	const blog = new BlogModel({
// 		name: 'Minä',
// 		email: 'Moi',
// 		text: 'this is my blog',
// 	});

// 	blog.save();
// });

// google authi
app.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);

// callback googlelle, redirectiin
app.get('/auth/google/redirect', passport.authenticate('google'), (req: Request, res: Response) => {
	res.redirect('http://localhost:3000');
});

app.get('/isAuthenticated', checkAuthentication, function (req: Request, res: Response) {
	//do something only if user is authenticated
	res.send({ isAuthenticated: true });
});

app.get('/user-details', (req: Request, res: Response) => {
	res.send(req.user);
});

app.post('/signout', (req: Request, res: Response) => {
	req.session = null;
	res.status(200).send(true);
});

app.post('/new-blog', (req: Request, res: Response) => {
	const { name, email, text } = req.body;

	const blog = new BlogModel({
		name: name,
		email: email,
		text: text,
	});

	blog.save((err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});
