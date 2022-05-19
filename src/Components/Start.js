import React from 'react';

export default function Start(props) {
	return (
		<div className="Start">
			<h1 className="Start--title">Quizzical</h1>
			<p className="Start--description">Some descriptions if needed</p>
			<div className="Start--buttonholder">
				<button className="Start--button" onClick={props.startQuiz}>
					Start Quiz
				</button>
			</div>
		</div>
	);
}
