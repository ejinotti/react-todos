var React = require('react');

var TodoListItem = require('./todo_list_item');

var TodoList = React.createClass({
  render: function () {
    var todos = this.props.todos;
    var self = this;
    var items = Object.keys(todos).map(function (id) {
      return <TodoListItem key={id} todo={todos[id]}
                           selectTodo={self.props.selectTodo} />;
    });

    return<div>{items}</div>;
  },
});

module.exports = TodoList;
