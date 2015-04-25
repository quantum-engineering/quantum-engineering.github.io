var React = require('react');
var file = require('./somefile');


var MainLayout = React.createClass({
  render: function() {
    return (
      <h1>lorem ipsum dolor sit amet</h1>
    )
  }
});

React.render(<MainLayout />, document.getElementById('layout'));
