var React = require('react');

var TodoStore = require('./stores/todo_store');
var DoneButton = require('./done_button');

module.exports = React.createClass({
  handleDestroy: function () {
    TodoStore.destroy(this.props.todo.id);
  },
  render: function () {
    return (
      <div>
        <div>{this.props.todo.title}</div>
        <div>{this.props.todo.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
        <DoneButton todo={this.props.todo} />
      </div>
    );
  },
});
