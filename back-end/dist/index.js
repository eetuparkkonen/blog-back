"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const app = (0, express_1.default)();
const port = 8000;
// MongoDB connect ja portin 8000 kuuntelu
mongoose_1.default
    .connect('mongodb+srv://eetuparkkonen:0659@fullstack-demo.nprou.mongodb.net/project?retryWrites=true&w=majority')
    .then(() => app.listen(port, () => console.log(`Connected to database and listening for port ${port}`)))
    .catch((err) => console.log(err));
app.get('/', (req, res) => {
    res.send('Hello my friend');
});
app.post('/', (req, res) => console.log('gei'));
// Uuden blogin lisääminen MongoDB collectioniin
app.get('/add-blog', (req, res) => {
    const blog = new schema_1.BlogModel({
        name: 'Minä',
        email: 'Moi',
        text: 'this is my blog',
    });
    blog.save();
});
