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
    res.render('project');
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

// Code taken from https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes
// app.get('*', (req, res) => {
//     res.status(404).send('<h2 style="color:#8d9091; font-size:40px;"> Page you are looking for does not exist </h2>')
//     // let error = new Error();
//     // console.log(error.status);

// });