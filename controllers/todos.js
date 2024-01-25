const path = require('path');

const Todo = require('../models/todo');

exports.getIndex = (req, res, next) => {
  Todo.findAll()
    .then((todos) => {
      res.render('/api/todos', {
        todos: todos,
        path: '/',
      });
    })
    .catch(console.log);
};

exports.getAddTodo = (req, res, next) => {
  res.render('#', {
    path: '/api/add_todo',
  });
};

exports.postAddTodo = (req, res, next) => {
  const status = NOTSTARTED;
  const title = req.body.title;
  const description = req.body.description;
  Todo.create({
    status: status,
    title: title,
    description: description,
  })
    .then(() => {
      res.redirect('api/todos');
    })
    .catch(console.log);
};

exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      res.render('detail', {
        todo: todo,
        pageTitle: todo.title,
        path: '/the_todo',
      });
    })
    .catch(console.log);
};

exports.getEditTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      res.render('#', {
        pageTitle: 'Edit Todo',
        path: 'api/edit_todo/',
        todo: todo,
        // editing: editMode,
      });
    })
    .catch(console.log);
};

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  const todoStatus = req.body.todoStatus;
  const todoTitle = req.body.title;
  const todoDescription = req.body.description;
  Todo.findByPk(todoId)
    .then((todo) => {
      todo.id = todoId;
      todo.status = todoStatus;
      todo.title = todoTitle;
      todo.description = todoDescription;
      todo.save();
    })
    .then(() => {
      res.redirect('api/the_todo');
    })
    .catch(console.log);
};

exports.postDeleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      todo.destroy();
    })
    .then(() => {
      res.redirect('/api/the_todo');
    })
    .catch(console.log);
};

exports.get404 = (req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, '../', 'views', 'ejs', '404.html'));
};
