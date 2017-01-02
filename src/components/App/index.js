import React, { PropTypes, Component} from 'react';
import './index.css';
import classnames from 'classnames';
import { Link } from 'react-router';

class App extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
        <div className="logo"><h1>Quotepasta</h1>
        </div>
        <div className="menu">
          <ul>
            <li><h4><Link to="/">Home</Link></h4></li>
            <li><h4><Link to="/about">About</Link></h4></li>
            <li><h4><Link to="/contact">Contact</Link></h4></li>
            <li><h4><Link to="/tags">Tags</Link></h4></li>
          </ul>
        </div>
        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
