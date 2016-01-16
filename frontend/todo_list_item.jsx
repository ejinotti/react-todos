var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <div>{this.props.todo.title}</div>
        <div>{this.props.todo.body}</div>
      </div>
    );
  },
});
