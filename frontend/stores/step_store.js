'use strict';

var agent = require('superagent');

var _stepsByTodoId = {};
var _callbacksByTodoId = {};

function getCbs(todoId) {
  _callbacksByTodoId[todoId] = _callbacksByTodoId[todoId] || [];
  return _callbacksByTodoId[todoId];
}

function getSteps(todoId) {
  _stepsByTodoId[todoId] = _stepsByTodoId[todoId] || {};
  return _stepsByTodoId[todoId];
}

var StepStore = {
  changed: function (todoId) {
    getCbs(todoId).forEach(function (cb) { cb(); });
  },
  addChangeHandler: function (todoId, fn) {
    getCbs(todoId).push(fn);
  },
  removeChangeHandler: function (todoId, fn) {
    var cbs = getCbs(todoId);
    var idx = cbs.indexOf(fn);

    if (idx !== -1) {
      cbs.splice(idx, 1);
    }
  },
  all: function (todoId) {
    return getSteps(todoId);
  },
  fetch: function (todoId) {
    agent
      .get('/api/todos/' + todoId + '/steps')
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        var steps = getSteps(todoId);

        result.body.forEach(function (step) {
          steps[step.id] = step;
        });
        StepStore.changed(todoId);
      });
  },
  create: function (todoId, step) {
    agent
      .post('/api/todos/' + todoId + '/steps')
      .send(step)
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        var newStep = result.body;
        var steps = getSteps(newStep.todo_id);

        steps[newStep.id] = newStep;
        StepStore.changed(newStep.todo_id);
      });
  },
  destroy: function (todoId, id) {
    var steps = getSteps(todoId);

    if (!steps[id]) {
      return;
    }
    agent
      .del('/api/todos/steps/' + id)
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        delete steps[id];
        StepStore.changed(todoId);
      });
  },
  toggleDone: function (todoId, id) {
    var steps = getSteps(todoId);

    if (!steps[id]) {
      return;
    }
    agent
      .patch('/api/todos/steps/' + id)
      .send({done: !steps[id].done})
      .end(function (err, result) {
        if (err) {
          return console.error(err.message);
        }
        steps[id] = result.body;
        StepStore.changed(todoId);
      });
  },
};

module.exports = StepStore;
