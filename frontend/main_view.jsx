var React = require('react');

var TodoStore = require('./stores/todo_store');
var StepList = require('./step_list');

var MainView = React.createClass({
  handleDestroy: function () {
    TodoStore.destroy(this.props.todo.id);
  },
  render: function () {
    if (!this.props.todo) {
      return <div></div>;
    }
    return (
      <div>
        <div>{this.props.todo.title}</div>
        <div>{this.props.todo.body}</div>
        <StepList todoId={this.props.todo.id} />
        <button onClick={this.handleDestroy}>Delete Todo</button>
      </div>
    );
  },
});

module.exports = MainView;
