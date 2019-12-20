exports.get404 = (req, res, next) => {
  res.status(404).send(' error 404   try with postman http://localhost:3003/signup ');
};


exports.get500 = (req, res, next) => {
  res.status(500).send('error 500');
};
