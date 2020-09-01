const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');

const app = express();

mongoose.set('debug', config.IS_PRODUCTION);
mongoose
    .connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected.'))
    .catch((error) => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());

app.get('/', async (req, res) => {
    try {
        // const posts = await Post.find({});
        res.render('index', { posts: [] });
        // res.status(201).json({ message: 'Hello' });
    } catch (e) {
        res.status(500).json({ message: 'Server Error, try again.' });
    }
});

app.get('/signin', (req, res) => {
    res.render('sign-in');
});

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);

// app.get('/create', (req, res) => res.render('create'));
// app.post('/create', async (req, res) => {
//     try {
//         const { title, text } = req.body;
//         const post = new Post({ title, text });
//         await post.save();
//         res.redirect('/');
//     } catch (e) {
//         res.status(500).json({ message: 'Server Error, try again.' });
//     }
// });

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: !config.IS_PRODUCTION ? err : {},
    });
});

// async function start() {
//     try {
//         mongoose.set('debug', config.IS_PRODUCTION);
//         await mongoose.connect(config.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         });
//         app.listen(config.PORT, () => {
//             console.log(`Example app listening on port ${config.PORT}`);
//         });
//     } catch (e) {
//         console.log('Server Error', e.message);
//         process.exit(1);
//     }
// }
// start();

module.exports = app;
