import React from 'react';
import List from './List'
import './App.css';

const storageName = 'react_projman';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let appData;

    try {
      appData = JSON.parse(localStorage.getItem(storageName));
    } catch(e) {}

    if(!appData || typeof appData !== 'object') {
      appData = {
        lists: [
          {
            id: 'todo',
            title: 'TODO'
          },
          {
            id: 'done',
            title: 'DONE'
          }
        ],
        cards: [
          {
            list_id: 'todo',
            id: 'todofirst',
            text: 'lorem ipsum'
          }
        ]
      };
    }

    this.state = {
      list_name: '',
      appData: appData
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragDrop = this.handleDragDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCardSubmit = this.handleCardSubmit.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem(storageName, JSON.stringify(this.state.appData));
  }

  handleDragStart(event, id) {
    event.dataTransfer.setData("id", id);
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDragDrop(event, listId) {
    const newState = {...this.state};
    const id = event.dataTransfer.getData('id');

    newState.appData.cards = newState.appData.cards.map((card) => {
      if(card.id !== id) {
        return card;
      } else {
        const newCard = {...card};
        newCard.list_id = listId;
        return newCard;
      }
    });

    this.setState(newState);
  }

  handleChange(event) {
    const newState = {...this.state};
    newState.list_name = event.target.value;
    this.setState(newState);
  }

  handleCardSubmit(event, listId, text) {
    event.preventDefault();

    const newState = {...this.state};

    newState.appData.cards.push({
      list_id: listId,
      id: Math.random().toString(36).substring(7),
      text: text
    });

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newState = {...this.state};

    newState.appData.lists.push({
      id: Math.random().toString(36).substring(7),
      title: newState.list_name
    });

    newState.list_name = '';
    this.setState(newState);
  }

  handleListDelete(id) {
    const newState = {...this.state};
    
    newState.appData.lists = newState.appData.lists.filter((list) => {
      return list.id !== id;
    });

    newState.appData.cards = newState.appData.cards.filter((card) => {
      return card.list_id !== id;
    });

    this.setState(newState);
  }

  handleCardDelete(event, id) {
    const newState = {...this.state};
    
    newState.appData.cards = newState.appData.cards.filter((card) => {
      return card.id !== id;
    });

    this.setState(newState);
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="Add a new list"
            className="list-name-input"
            onChange={this.handleChange}
            value={this.state.list_name}
          />
        </form>

        <div className="list-output">
          {this.state.appData.lists.map((list) => {
            list.cards = this.state.appData.cards.filter((card) => {
              return card.list_id === list.id;
            });

            return (
              <List 
              key={list.id} data={list}
              onCardSubmit={this.handleCardSubmit}
              onCardDelete={this.handleCardDelete}
              onDelete={this.handleListDelete}
              onDragOver={this.handleDragOver}
              onDragStart={this.handleDragStart}
              onDragDrop={this.handleDragDrop}
              />
            );
            })}
        </div>
      </div>
    )
  }
}