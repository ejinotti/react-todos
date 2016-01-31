var React = require('react');

var StepStore = require('./stores/step_store');
var DoneButton = require('./done_button');

var StepListItem = React.createClass({
  handleDestroy: function () {
    StepStore.destroy(this.props.step.todo_id, this.props.step.id);
  },
  render: function () {
    return (
      <div>
        {this.props.step.body}
        <DoneButton item={this.props.step} />
        <button onClick={this.handleDestroy}>Delete Step</button>
      </div>
    );
  },
});

module.exports = StepListItem;
