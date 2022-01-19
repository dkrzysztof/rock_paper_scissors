import Figure from './Figure';

export const getFigureFromResults = function (results) {
	const [paper, rock, scissors] = results;
	const figure = Math.max(paper, rock, scissors);

	if (figure === paper) return 'paper';
	if (figure === scissors) return 'scissors';
	if (figure === rock) return 'rock';
	return 'rock';
};

function ComputerFigure({ results }) {
	const userFigure = getFigureFromResults(results);
	let computerFigure = <>&#9994;</>;

	switch (userFigure) {
		case 'scissors':
			computerFigure = 'rock';
			break;
		case 'rock':
			computerFigure = 'paper';
			break;
		case 'paper':
			computerFigure = 'scissors';
			break;
	}

	return <Figure type={computerFigure} />;
}

export default ComputerFigure;
