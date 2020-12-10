const express = require('express')

//db connection
const connectDB = require('./config/db')

//models
const HttpError = require('./models/http-error')


const app = express()

app.use(express.json()) //for bodyparsing 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    next();
});

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/posts', require('./routes/api/posts'))

app.use((req, res, next) => {
    return new HttpError('Couldnt find any route you provided !', 404)
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
})

connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))