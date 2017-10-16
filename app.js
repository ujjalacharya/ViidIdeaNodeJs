const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//get rid of the warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/vididea-dev', { useMongoClient: true })

.then(()=> console.log("MongoDB connected..."))
.catch(err => console.log(err));

//Load Idea Models
require('./models/Idea');
const Idea = mongoose.model("ideas")

//Middleware for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
  res.render('index', {
    title: "Welcome"
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Route
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

//Process the form
app.post('/ideas', (req, res)=>{
  res.send(`<h2>${req.body.title}</h2>`);
});



app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});