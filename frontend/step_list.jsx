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
  componentDidMount: function () {
    console.log('StepList mounted for todo #' + this.props.todoId);
    StepStore.addChangeHandler(this.props.todoId, this.stepsChanged);
    StepStore.fetch(this.props.todoId);
  },
  componentWillUnmount: function () {
    StepStore.removeChangeHandler(this.props.todoId, this.stepsChanged);
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
