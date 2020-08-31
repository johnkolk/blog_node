const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const Post = require('./models/Post');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('index', { posts });
        // res.status(201).json({ message: 'Hello' });
    } catch (e) {
        res.status(500).json({ message: 'Server Error, try again.' });
    }
});

app.get('/create', (req, res) => res.render('create'));
app.post('/create', async (req, res) => {
    try {
        const { title, text } = req.body;
        const post = new Post({ title, text });
        await post.save();
        res.redirect('/');
    } catch (e) {
        res.status(500).json({ message: 'Server Error, try again.' });
    }
});

async function start() {
    try {
        await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        app.listen(config.PORT, () => {
            console.log(`Example app listening on port ${config.PORT}`);
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}
start();
