// TodoStore = require('./stores/todo_store');
// StepStore = require('./stores/step_store');
var ReactDOM = require('react-dom');
var React = require('react');

var TodoStore = require('./stores/todo_store');
var SidebarView = require('./sidebar_view');
var MainView = require('./main_view');

var TodoReact = React.createClass({
  getInitialState: function () {
    return {todos: TodoStore.all(), selectedTodo: null};
  },
  todosChanged: function () {
    this.setState({todos: TodoStore.all()});
  },
  componentDidMount: function () {
    TodoStore.addChangeHandler(this.todosChanged);
    TodoStore.fetch();
  },
  componentWillUnmount: function () {
    TodoStore.removeChangeHandler(this.todosChanged);
  },
  selectTodo: function (id) {
    var self = this;

    return function () {
      self.setState({selectedTodo: self.state.todos[id]});
    };
  },
  render: function () {
    return (
      <div style={{overflow: 'auto'}}>
        <div style={{width: '50%', float: 'left'}}>
          <SidebarView todos={this.state.todos} selectTodo={this.selectTodo} />
        </div>
        <div style={{overflow: 'hidden'}}>
          <MainView todo={this.state.selectedTodo} />
        </div>
      </div>
    );
  },
});

ReactDOM.render(<TodoReact />, document.getElementById('main-content'));
