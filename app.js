const express = require('express');
const data = require('./data.json').projects;
const app = express();

// set pug as template
app.set("view engine", "pug");

// uses the static file in public folder 
app.use('/static', express.static("public"));

// get request to the root route and calling index.pug template file
app.get('/', (req, res) => {
    res.locals.projects = data;
    res.render('index')
});

// get request to the /about route and calling about.pug template file
app.get('/about', (req, res) => {
    res.render('about');
});

// get request to the /project/id route and calling project.pug template file
app.get('/project/:id', (req, res) => {
    let id = req.params.id;
    res.locals.project = data[id];

    // displays error if the project does not exist
    if (id >= data.length) {
        // creates error
        const err = new Error('This project is unavailable');
        res.status(404);
        // calls the error template and sends error to it
        res.render('error', {error: err});
    } else {
        res.render('project');
    }
});

// 404 error handling 
app.use( (req, res, next) => {
    const error = new Error(' Page you are looking for does not exist');
    error.status = 404;
    next(error);
})

// displays error message and status 
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000);

