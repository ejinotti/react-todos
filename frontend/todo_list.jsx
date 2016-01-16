var React = require('react');
var TodoStore = require('./stores/todo_store');

module.exports = React.createClass({
  getInitialState: function () {
    return {todos: TodoStore.all()};
  },
  render: function () {
    var todos = this.state.todos;
    var items = Object.keys(todos).map(function (id) {
      return <li key={id}>{todos[id].title}</li>;
    });

    return <div><ul>{items}</ul></div>;
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
