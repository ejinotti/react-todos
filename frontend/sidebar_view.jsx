var React = require('react');

var TodoList = require('./todo_list');
var TodoForm = require('./todo_form');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <TodoList todos={this.props.todos} selectTodo={this.props.selectTodo} />
        <TodoForm />
      </div>
    );
  },
});
