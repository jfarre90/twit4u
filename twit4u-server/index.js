require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors'); // cors is a module to solve the issues of cross-origin referencing, where javascript limits us that the js can only come from the same source and not from external sources.
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/awth');
const db = require("./models");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json()); //using json as we are building the API

app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages', 
    loginRequired, 
    ensureCorrectUser, 
    messagesRoutes
);

app.get('/api/messages', loginRequired, async function(req,res,next){
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: 'desc' })
            .populate('user', {
                username: true,
                profileImageUrl: true
            });
        return res.status(200).json(messages);
    } catch(e) {
        return next(e);
    }
});


//If none of the routes above return something, we have the below as error handling.
app.use(function(req,res,next){
    let err = new Error("Not found"); //error is a built in model in Javascript
    err.status = 404;
    next(err);
});

//We will take any input with an error and display a nicer error message in json format, using the error helper
app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
})