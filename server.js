const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    console.log(log);
    next();
});
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
//     next();
// });
app.use(express.static(__dirname + '/public/'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    // res.send('<h1>Hello express!<\h1>');

    // res.send({
    //     name: 'Lucas',
    //     likes: ['a','b','c']
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Filler text is always the best when it is actually filled with some kind of text.' 
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res)=>{    
    res.send({
        errorMessage: 'Unable to handle request.'
    });

});


app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});