const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();


const MONGODB_URI =
  `mongodb+srv://kalil123:kalil123@cluster0-3f2cx.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

  const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });


const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/todo', todoRoutes);
app.use(authRoutes);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(500).send(' error 500');
});

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true })
  .then(result => {
    app.listen(process.env.PORT || 3003);
    console.log("server runing on 3003");
  })
  .catch(err => {
    console.log(err);
  });
