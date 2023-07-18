const express = require('express');
const exphbs= require('express-handlebars');
const session= require('express-session');
const bodyParser = require('body-parser');
const postsController = require('./controllers/postsController');
const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const db = require('./models');
require('dotenv').config();

const app = express();
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', '.handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
// Configure express-session middleware
app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: true,
      store: db.sessionStore
    })
  );
  
  // Routes
  app.get('/', homeController.index);
  app.get('/login', authController.loginForm);
  app.post('/login', authController.login);
  app.get('/signup', authController.signupForm);
  app.post('/signup', authController.signup);
  app.get('/logout', authController.logout);
  //app.get('/', postsController.index);
  app.get('/posts/:id', postsController.show);
  app.post('/posts', postsController.create);


// Start the server
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
