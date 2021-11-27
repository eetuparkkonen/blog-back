"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogModel_1 = require("./models/blogModel");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
require("./services/passport-setup");
const cookie_session_1 = __importDefault(require("cookie-session"));
const isAuthenticated_1 = require("./middleware/isAuthenticated");
const app = express_1.default();
const port = 8000;
// osoite josta apia voi kutsua (react front on portissa 3000)
//const allowedOrigins = [];
const options = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors_1.default(options));
app.use(cookie_session_1.default({
    // aika millisekunneissa kauanko keksi "elää"
    maxAge: 60 * 60 * 60,
    keys: [process.env.keys],
    name: 'sid',
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// MongoDB connect ja portin 8000 kuuntelu
mongoose_1.default
    .connect(process.env.mongoDBConnection) // ! tarkoittaa ei tyypistystä
    .then(() => app.listen(port, () => console.log(`Connected to database and listening for port ${port}`)))
    .catch((err) => console.log(err));
app.get('/posts', (req, res) => {
    blogModel_1.BlogModel.find({}, (err, blog) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(blog);
        }
    });
});
// Uuden blogin lisääminen MongoDB collectioniin
app.get('/add-blog', (req, res) => {
    const blog = new blogModel_1.BlogModel({
        name: 'Minä',
        email: 'Moi',
        text: 'this is my blog',
    });
    blog.save();
});
// google authi
app.get('/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile'],
}));
// callback googlelle, redirectiin
app.get('/auth/google/redirect', passport_1.default.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000');
});
app.get('/isAuthenticated', isAuthenticated_1.checkAuthentication, function (req, res) {
    //do something only if user is authenticated
    res.send({ isAuthenticated: true });
});
app.post('/signout', (req, res) => {
    req.session = null;
    res.status(200).send(true);
});
