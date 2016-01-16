// TodoStore = require('./stores/todo_store');
var ReactDOM = require('react-dom');
var React = require('react');

var TodoList = require('./todo_list');

ReactDOM.render(<TodoList />, document.getElementById('main-content'));
