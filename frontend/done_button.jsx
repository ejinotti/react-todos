var React = require('react');

var TodoStore = require('./stores/todo_store');

module.exports = React.createClass({
  handleDone: function () {
    TodoStore.toggleDone(this.props.todo.id);
  },
  render: function () {
    return (
      <button onClick={this.handleDone}>
        {this.props.todo.done ? 'Undo' : 'Done'}
      </button>
    );
  }
});
