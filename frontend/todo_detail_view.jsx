var React = require('react');

var TodoStore = require('./stores/todo_store');
var StepList = require('./step_list');

module.exports = React.createClass({
  handleDestroy: function () {
    TodoStore.destroy(this.props.todo.id);
  },
  render: function () {
    return (
      <div>
        <div>{this.props.todo.body}</div>
        <StepList todoId={this.props.todo.id} />
        <button onClick={this.handleDestroy}>Delete Todo</button>
      </div>
    );
  }
});
