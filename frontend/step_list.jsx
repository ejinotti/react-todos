var React = require('react');

var StepStore = require('./stores/step_store');
var StepListItem = require('./step_list_item');
var StepForm = require('./step_form');

var StepList = React.createClass({
  getInitialState: function () {
    return {steps: StepStore.all(this.props.todoId)};
  },
  stepsChanged: function () {
    this.setState({steps: StepStore.all(this.props.todoId)});
  },
  addHandler: function (todoId) {
    StepStore.addChangeHandler(todoId, this.stepsChanged);
    StepStore.fetch(todoId);
  },
  removeHandler: function () {
    StepStore.removeChangeHandler(this.props.todoId, this.stepsChanged);
  },
  componentDidMount: function () {
    this.addHandler(this.props.todoId);
  },
  componentWillUnmount: this.removeHandler,
  componentWillReceiveProps: function (nextProps) {
    this.removeHandler();
    this.addHandler(nextProps.todoId);
  },
  render: function () {
    var steps = this.state.steps;
    var items = Object.keys(steps).map(function (id) {
      return <StepListItem key={id} step={steps[id]} />;
    });

    return (
      <div>
        {items}
        <StepForm todoId={this.props.todoId} />
      </div>
    );
  },
});

module.exports = StepList;
