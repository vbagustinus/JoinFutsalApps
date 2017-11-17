// require libraries
const app = require('express')();
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors')

// require routes
const index = require('./routes/index');
const users = require('./routes/users');
const events = require('./routes/events');
const login = require('./routes/login');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//
// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
//     next();
// });

// routes
app.use('/login', login);
app.use('/', index);
app.use('/users', users);
app.use('/events', events);

app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
