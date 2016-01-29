var React = require('react');

var TodoStore = require('./stores/todo_store');
var StepStore = require('./stores/step_store');

module.exports = React.createClass({
  handleDone: function () {
    if (this.props.item.todo_id) {
      StepStore.toggleDone(this.props.item.todo_id, this.props.item.id);
    } else {
      TodoStore.toggleDone(this.props.item.id);
    }
  },
  render: function () {
    return (
      <button onClick={this.handleDone}>
        {this.props.item.done ? 'Undo' : 'Done'}
      </button>
    );
  }
});
