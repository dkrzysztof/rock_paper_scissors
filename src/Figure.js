import React from 'react';

function Figure({ type }) {
	let emoji = <></>;

	switch (type) {
		case 'scissors':
			emoji = <>&#9996;</>;
			break;
		case 'rock':
			emoji = <>&#9994;</>;
			break;
		case 'paper':
			emoji = <>&#9995;</>;
			break;
	}

	return <span style={{ fontSize: '100px' }}>{emoji}</span>;
}

export default Figure;
