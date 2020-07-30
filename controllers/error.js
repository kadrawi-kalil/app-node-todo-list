exports.get404 = (req, res, next) => {
  res.status(404).send(' error 404  try to Sign in with   https://app-node-todo-kalil.herokuapp.com/signup ');
};


exports.get500 = (req, res, next) => {
  res.status(500).send('error 500');
};
