'use strict';

var agent = require('superagent');

var _todos = {};
var _callbacks = [];

var TodoStore = {
  changed: function () {
    console.log('TodoStore.changed()');
    _.callback.forEach(function (cb) { cb(); });
  },
  addChangeHandler: function () {

  },
  removeChangeHandler: function () {

  },
  all: function () {
    return _todos;
  },
  fetch: function () {
    agent
      .get('/api/todos')
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        result.body.forEach(function (todo) {
          _todos[todo.id] = todo;
        });
        TodoStore.changed();
      });
  },
  create: function (todo) {
    agent
      .post('/api/todos')
      .send(todo)
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        _todos[result.body.id] = result.body;
        TodoStore.changed();
      });
  },
  destroy: function (id) {
    if (!_todos[id]) {
      return;
    }
    agent
      .del('/api/todos/' + id)
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        delete _todos[id];
        TodoStore.changed();
      });
  },
  toggleDone: function (id) {
    if (!_todos[id]) {
      return;
    }
    agent
      .patch('/api/todos/' + id)
      .send({done: !_todos[id].done})
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        _todos[id] = result.body;
        TodoStore.changed();
      });
  },
};

module.exports = TodoStore;
