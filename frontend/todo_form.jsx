var React = require('react');

var TodoStore = require('./stores/todo_store');

module.exports = React.createClass({
  getInitialState: function () {
    return {title: '', body: ''};
  },
  updateTitle: function (e) {
    this.setState({title: e.target.value.substr(0,255)});
  },
  updateBody: function (e) {
    this.setState({body: e.target.value.substr(0,255)});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    TodoStore.create({
      title: this.state.title,
      body: this.state.body,
      done: false,
    });
    this.setState({title: '', body: ''});
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="title" value={this.state.title}
               onChange={this.updateTitle} />
        <textarea name="body" value={this.state.body}
                  onChange={this.updateBody} />
        <button type="submit">Create Todo</button>
      </form>
    );
  },
});
