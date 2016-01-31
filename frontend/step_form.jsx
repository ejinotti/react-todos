var React = require('react');

var StepStore = require('./stores/step_store');

var StepForm = React.createClass({
  getInitialState: function () {
    return {body: ''};
  },
  updateBody: function (e) {
    this.setState({body: e.target.value.substr(0,255)});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    StepStore.create(this.props.todoId, {
      body: this.state.body,
      done: false,
    });
    this.setState({body: ''});
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="body" value={this.state.body}
               onChange={this.updateBody} />
        <button type="submit">Create Step</button>
      </form>
    );
  },
});

module.exports = StepForm;
