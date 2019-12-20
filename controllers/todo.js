const Todo = require('../models/todo');

exports.addTodo = (req, res) => {
  console.log(req.session.user._id)
  const usId=req.session.user._id;
  const { title,description}= req.body;
  console.log(usId)
  const todo = new Todo({title :title, description:description,userId:usId});
 
  todo.save()
    .then(result => {     
      return res.send('todo added =>'+result)
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};  

exports.getTodo = (req, res) => {
  const todoId = req.params.todoId;
  Todo.findById(todoId)
    .then(todo => {
      if (!todo) {
        return res.send('No Todo found');
      }
      return res.send(todo);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.editTodo = (req, res) => {
  const todoId = req.params.todoId;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;

  Todo.findById(todoId)
    .then(todo => {
      if(todo.userId.toString()!== req.user._id.toString()){
        return res.send('You have not acces to Edit')
      }
      todo.title = updatedTitle;
      todo.description = updatedDesc;
      return todo.save().then(result => { 
        return res.send('UPDATED TODO!'+result);
       });
    }).catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getTodos = (req, res) => {
  const usId=req.session.user._id;
  Todo.find({'userId':usId})
    .then(todos => {
      console.log(todos);
      res.send(todos);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteTodo = (req, res) => {
  const todoId = req.params.todoId;
  console.log(todoId)
  Todo.deleteOne({ _id:todoId,userId: req.user._id })
    .then(result => {
      if(result.deletedCount!==1){
        return  res.send("No Todo")
      }
      console.log('DESTROYED todo ',result)
      res.send("DESTROYED TODO"+result)
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
