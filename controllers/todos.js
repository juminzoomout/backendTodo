const path = require('path');

const Todo = require('../models/todo');

exports.getIndex = (req, res, next) => {
  Todo.findAll()
    .then((todos) => {
      res.render('ejs/home', {
        todos: todos,
        pageTitle: 'Todo List',
        path: '/',
      });
    })
    .catch(console.log);
};

exports.getAddTodo = (req, res, next) => {
  res.render('ejs/edit', {
    pageTitle: 'Add Todo',
    path: '/api/add_todo',
    editing: false,
  });
};

exports.postAddTodo = (req, res, next) => {
  const status = 'NOTSTARTED';
  const title = req.body.title;
  const description = req.body.description;
  Todo.create({
    status: status,
    title: title,
    description: description,
  })
    .then(() => {
      res.redirect('/api/todos');
    })
    .catch(console.log);
};

exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      res.render('ejs/detail', {
        todo: todo,
        pageTitle: todo.title,
        path: '/api/the_todo',
      });
    })
    .catch(console.log);
};

exports.getEditTodo = (req, res, next) => {
  const editMode = req.query.edit;
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      res.render('ejs/edit', {
        pageTitle: 'Edit Todo',
        path: '/api/edit_todo/',
        todo: todo,
        editing: editMode,
      });
    })
    .catch(console.log);
};

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  const todoStatus = req.body.status;
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
      res.redirect('/api/the_todo/:todoId');
    })
    .catch(console.log);
};

exports.postDeleteTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      todo.destroy();
    })
    .then(() => {
      res.redirect('/api/todos');
    })
    .catch(console.log);
};

exports.get404 = (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html'));
};
