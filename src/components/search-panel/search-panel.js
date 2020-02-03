import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component  {

    searchItem = (e) => this.props.onSearchChange(e.target.value);

    render() {
        return <input
            placeholder="Type here to search"
            onChange={this.searchItem}/>;
    }
};
