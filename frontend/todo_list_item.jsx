var React = require('react');

var DoneButton = require('./done_button');
var TodoDetailView = require('./todo_detail_view');

module.exports = React.createClass({
  getInitialState: function () {
    return {showDetail: false};
  },
  toggleDetail: function () {
    this.setState({showDetail: !this.state.showDetail});
  },
  render: function () {
    var detail = '';

    if (this.state.showDetail) {
      detail = <TodoDetailView todo={this.props.todo} />;
    }

    return (
      <div>
        <div onClick={this.toggleDetail}>
          {this.props.todo.title}
        </div>
        {detail}
        <DoneButton todo={this.props.todo} />
      </div>
    );
  },
});
