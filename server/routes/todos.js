const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const router = express.Router();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.use(authenticate);

router.get('/', async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

router.post('/', async (req, res) => {
  const todo = new Todo({ ...req.body, userId: req.user.id });
  await todo.save();
  res.json(todo);
});

router.put('/:id', async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.sendStatus(204);
});

module.exports = router;
