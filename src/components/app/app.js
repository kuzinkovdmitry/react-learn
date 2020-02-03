import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Tea'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const filteredData = todoData.filter(item => item.id !== id);
            return {
                todoData: filteredData
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newList = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newList
            }
        });
    };

    toggleProperty(arr, id, propName) {
        const oldItem = arr.find(el => el.id === id);
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return arr.map(item => item.id === newItem.id ? newItem : item);
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onSearchChange = (term) => this.setState({term});

    onFilterChange = (filter) => this.setState({filter});

    searchData(items, term) {
        return term ? items.filter(item => item.label.toLowerCase().includes(term.toLowerCase())) : items;
    };

    filterData(items, filter) {
        return filter === 'all' ? items : items.filter(item => filter === 'done' ? item.done : !item.done);
    }

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filterData(this.searchData(todoData, term), filter);
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="main">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="search-filter">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <AddItem onItemAdded={this.addItem}/>
            </div>
        );
    }
};
