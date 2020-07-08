import React from 'react';
import {SettingsContext} from '../../context/todo-context';
import  {When}  from '../if/if';

class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  static contextType = SettingsContext; //magical line

  render() {
    return (
      <>
        <div className='bar'>

          <div>Total items: {this.props.list.length}</div>
          <div>Current page is {this.context.currentPage}</div>
          <div>Total pages:{Math.ceil(this.props.list.length / this.context.itemsPerPage)}</div>
          
          <When condition={this.context.currentPage > 1}>
            <input
              type="button"
              value="back"
              onClick={this.context.changeCurrentPageDec}
            />
          </When>
          <When
            condition={
              this.context.currentPage <
              Math.floor(this.props.list.length / this.context.itemsPerPage)
            }
          >
            <input
              type="button"
              value="next"
              onClick={this.context.changeCurrentPageInc}
            />
          </When>
        </div>
      </>
    );
  }
}


export default Content;
