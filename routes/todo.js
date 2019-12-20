const path = require('path');

const express = require('express');

const todoController = require('../controllers/todo');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/',isAuth, todoController.getTodos);

router.post('/add',isAuth, todoController.addTodo);

router.get('/:todoId',isAuth, todoController.getTodo);

router.put('/:todoId',isAuth, todoController.editTodo);

router.delete('/:todoId',isAuth, todoController.deleteTodo);

module.exports = router;
