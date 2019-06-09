import React from 'react';
import './Card.css';

const Card = (props) => {
	return (
		<div className="list-item-card" 
			draggable
			onDragStart={(e) => {props.onDragStart(e, props.id)}}
		>
			{props.text}

			<div 
				className="delete-button"
				onClick={(e) => props.onCardDelete(e, props.id)}
			>&times;</div>
		</div>
	);
}

Card.defaultProps = {
	text: '',
	id: null,
}

export default Card;