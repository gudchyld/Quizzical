import React from 'react';
import he from 'he';
import { nanoid } from 'nanoid';

export default function Question({ question, allAnswers, qID, updateClicked }) {
	//map through allAnswers array and get value,isClicked,isCorrect and id
	const answerElements = allAnswers.map((answer) => {
		return (
			<button
				key={nanoid()}
				className="button--button"
				onClick={() => updateClicked(qID, answer.id)}>
				{he.decode(answer.value)}{' '}
			</button>
		);
	});

	return (
		<div className="questions">
			<h3 className="questions--title">{he.decode(question)}</h3>
			<div className="questions--button">{answerElements}</div>
		</div>
	);
}
