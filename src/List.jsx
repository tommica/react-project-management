import React from 'react';
import Card from './Card';
import './List.css';

export default class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'card_text': ''
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			card_text: event.target.value
		});
	}

	render() {
		const cards = this.props.data.cards || [];

    	return (
			<div className="list-item-box">
				<div className="delete-button" onClick={() => this.props.onDelete(this.props.data.id)}>&times;</div>
				<div className="title">{this.props.data.title}</div>

				<div className="cards" 
					onDragOver={this.props.onDragOver}
					onDrop={(e) => this.props.onDragDrop(e, this.props.data.id)}
				>
					{cards.map(card => {
						return <Card 
							key={card.id} 
							text={card.text} 
							id={card.id} 
							onCardDelete={this.props.onCardDelete}
							onDragStart={this.props.onDragStart} />
					})}
				</div>

				<form onSubmit={(e) => {
					this.props.onCardSubmit(e, this.props.data.id, this.state.card_text)
					this.setState({
						card_text: ''
					});
				}}>
					<input type="text"
						placeholder="Add a new card"
						className="card-input"
						onChange={this.handleChange}
						value={this.state.card_text}
					/>
				</form>
			</div>
    	);
    }
}