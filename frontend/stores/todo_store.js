'use strict';

var agent = require('superagent');

var _todos, _callbacks;

var TodoStore = {
  changed: function () {

  },
  addChangeHandler: function () {

  },
  removeChangeHandler: function () {

  },
  all: function () {
    return _todos;
  },
  fetch: function () {
    var self = this;

    agent
      .get('/api/todos')
      .end(function (error, result) {
        if (error) {
          return console.error(error.message);
        }
        _todos = result.body;
        self.changed();
      });
  },
};

module.exports = TodoStore;
