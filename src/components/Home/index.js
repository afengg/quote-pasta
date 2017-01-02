// src/components/Home/index.js
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './style.css';
import CopyToClipboard from 'react-copy-to-clipboard';


class Tag extends React.Component {
  render(){
    var tag = this.props.tagName;
    return (
      <Link to="*" className="tag">{tag}</Link>
    );
  }
}

class TagsList extends React.Component {
  
  render(){
    var tagsList = [];
    this.props.tags.forEach((tag) => {
      tagsList.push(<Tag tagName={tag} />);
    });
    return (
      <div className="tagsList">
        {tagsList}
      </div>
    );
  }
}

class ItemSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      copied: false
    };
    }
  render() {
    var name = this.props.item.name;
    return (
    /*
      <tr>
        <td>{name}</td>
        <td>{tags}</td>
        <td><CopyToClipboard text={name}
                             onCopy={() => this.setState({copied: true})}>
                             <button>Copy to Clipboard</button>
            </CopyToClipboard>
            </td>
      </tr>
      */
      <div className="itemSummary">
        <div className="itemUtilities">
          <CopyToClipboard text={name}
                               onCopy={() => this.setState({copied: true})}>
                               <button>Copy to Clipboard</button>
          </CopyToClipboard>
          <TagsList tags={this.props.item.tags}/>
        </div>
        <div className="itemContent">
          <p>{name}</p>
        </div>
      </div>
    );
  }
}

class ItemList extends React.Component {
  render(){
    
    var rows = [];
    this.props.items.forEach((item) => {
    
        /* Note that the following if statement searches the name STRING and the tags ARRAY. so searching for a tag will only
           provide the results once the entire tag is entered in, instead of part of the tag. React components only pass props
           in one direction, and we joined the tags array in the smallest component instead of the largest component.
        
        */
        if (item.name.indexOf(this.props.filterText) === -1 && item.tags.indexOf(this.props.filterText) === -1){
          return;
        }
        rows.push(<ItemSummary item={item} />);
      });
    return (
    /*
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          </tbody>
      </table>
      */
      <div className="itemList">
        {rows}
      </div>
    );  
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange() {
      this.props.onUserInput(
        this.filterTextInput.value
      );
    }
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref={(input) => this.filterTextInput = input}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

class FilterableItemList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: ''
    };
    
    this.handleUserInput = this.handleUserInput.bind(this);
    
    }
    
  handleUserInput(filterText){
      this.setState({
        filterText: filterText
      });
    }
  render() {
    return (
      <div className="filterableItemList">
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput}
                   />
        <ItemList items={this.props.items}
                   filterText={this.state.filterText}/>
      </div>
    );
  }
}


var PRODUCTS = [
  {tags: ['test','test1'], stocked: true, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sem congue, lacinia mauris et, pulvinar eros.'},
  {tags: ['test'], stocked: true, name: 'Maecenas non leo lobortis, sagittis erat sed, suscipit nunc.'},
  {tags: ['test1', 'test3'], stocked: false, name: 'In in nulla turpis. Integer pellentesque dui ligula, non feugiat sapien iaculis eget.'},
  {tags: ['test', 'test3'], stocked: true, name: 'Pellentesque viverra eros elit, sed vulputate quam rhoncus quis.'},
  {tags: ['test2'], stocked: false, name: 'Duis a ipsum non felis cursus pulvinar. Suspendisse iaculis sed elit faucibus semper.'},
  {tags: ['test1'], stocked: true, name: 'Praesent consectetur vitae lorem quis interdum.'}
];


export default class Home extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Home', className)} {...props}>
        <FilterableItemList items={PRODUCTS} />
      </div>
    );
  }
}