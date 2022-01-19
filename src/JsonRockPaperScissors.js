import React from 'react';

const JsonRockPaperScissors = ({ results }) => {
	console.log(results);
	const [paper, rock, scissors] = results;
	return (
		<div className='json'>
			<br />
			{'{'}
			<br />
			<span>{`paper: ${(paper * 100).toFixed(2)} %,`}</span>
			<br />
			<span>{`rock: ${(rock * 100).toFixed(2)} %,`}</span>
			<br />
			<span>{`scissors: ${(scissors * 100).toFixed(2)} %,`}</span>
			<br />
			{'}'}
		</div>
	);
};

export default JsonRockPaperScissors;
