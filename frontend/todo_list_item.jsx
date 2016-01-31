var React = require('react');

var DoneButton = require('./done_button');
var TodoDetailView = require('./todo_detail_view');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <span onClick={this.props.selectTodo(this.props.todo.id)}>
          {this.props.todo.title}
        </span>
        <DoneButton item={this.props.todo} />
      </div>
    );
  },
});
