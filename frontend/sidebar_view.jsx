var React = require('react');

var TodoList = require('./todo_list');
var TodoForm = require('./todo_form');

var SidebarView = React.createClass({
  render: function () {
    return (
      <div>
        <TodoList todos={this.props.todos} selectTodo={this.props.selectTodo} />
        <TodoForm />
      </div>
    );
  },
});

module.exports = SidebarView;
