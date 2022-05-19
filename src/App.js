import './styles.css';

import React from 'react';
import Start from './Components/Start';
import Quiz from './Components/Quiz';

export default function App() {
	const [isStart, setIsStart] = React.useState(true);

	function startQuiz() {
		setIsStart(false);
	}

	return (
		<div className="App">
			{isStart ? <Start startQuiz={startQuiz} /> : <Quiz />}
		</div>
	);
}
