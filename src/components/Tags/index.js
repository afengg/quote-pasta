import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './style.css';

class TagCell extends React.Component {
  render(){
    return(
      <td>
        <p>{this.props.tag.name}</p>
      </td>
    );
  }
}

class TagRow extends React.Component {
  render(){
    var tag_cells = [];
    this.props.tagrow.forEach((tag) => {
      tag_cells.push(<TagCell tag={tag}/>);
    });
    return(
      <tr>
        {tag_cells}
      </tr>
    );
  }
}

class TagsTable extends React.Component {
  render(){
    /* 4 tags per table row
    */
    var rows = [];
    var i,j, temparray, chunk = 4;
    for(i=0, j=this.props.tags.length; i<j; i+=chunk){
      temparray = this.props.tags.slice(i,i+chunk);
      rows.push(<TagRow tagrow={temparray} />);      
    }    
    return(
      
      <div className="allTags">
        <table id="tagstable">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      
    );
  }
}

var TAGS = [
            {name: 'test2'},
            {name: 'test'},
            {name: 'test3'},
            {name: 'test1'}];

export default class Tags extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Tags', className)} {...props}>
        <TagsTable tags={TAGS} />
      </div>
    );
  }
}