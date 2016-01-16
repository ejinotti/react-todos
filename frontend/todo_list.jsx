var React = require('react');

var TodoStore = require('./stores/todo_store');
var TodoListItem = require('./todo_list_item');

module.exports = React.createClass({
  getInitialState: function () {
    return {todos: TodoStore.all()};
  },
  render: function () {
    var todos = this.state.todos;
    var items = Object.keys(todos).map(function (id) {
      return <TodoListItem key={id} todo={todos[id]} />;
    });

    return <div>{items}</div>;
  },
  todosChanged: function () {
    this.setState({todos: TodoStore.all()});
  },
  componentDidMount: function () {
    TodoStore.addChangeHandler(this.todosChanged);
    TodoStore.fetch();
  },
  componentWillUnmount: function () {
    TodoStore.removeChangeHandler(this.todosChanged);
  },
});
