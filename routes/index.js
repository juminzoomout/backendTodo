const express = require('express');

const router = express.Router();

const todosController = require('../controllers/todos');

// 기본 페이지
router.get('/todos', todosController.getIndex);

// todo 추가
router.get('/add_todo', todosController.getAddTodo);

router.post('/add_todo', todosController.postAddTodo);

// todo 자세히
router.get('/the_todo', todosController.getTodo);

// todo 수정
router.get('/edit_todo', todosController.getEditTodo);

router.get('/edit_todo', todosController.postEditTodo);

// todo 삭제
router.post('/the_todo', todosController.postDeleteTodo);

module.exports = router;
