const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const Session = require('../models/session');



exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send( errors.array()[0].msg
    );
  }


  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log('error', 'Invalid email or password.');
        return res.send('Invalid email or password');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.send('user Login');
            });
          }
          console.log('error', 'Invalid email or password.');
          res.send('Invalid email or password');
        })
        .catch(err => {
          console.log(err);
          res.send('problem login');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
 // const confirmPassword = req.body.confirmPassword;

 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   console.log(errors.array());
   return res.status(422).send( errors.array()[0].msg
   );
 }

 bcrypt
   .hash(password, 12)
   .then(hashedPassword => {
     const user = new User({
       email: email,
       password: hashedPassword
     });
     return user.save();
   })
   .then(result => {
     res.send('login ok '+result);
     // return transporter.sendMail({
     //   to: email,
     //   from: 'shop@node-complete.com',
     //   subject: 'Signup succeeded!',
     //   html: '<h1>You successfully signed up!</h1>'
     // });
   })
   .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.send('Logout ok');
  });
};




exports.getUsers = (req, res) => {
  User.find()
    .then(users => {
      console.log(users);
      res.send(users);
    })
    .catch(err => res.send(err));
};

exports.getSessions = (req, res) => {
  Session.find()
  .then(users => {
    console.log(users);
    res.send(users);
  })
  .catch(err => res.send(err));
  
};