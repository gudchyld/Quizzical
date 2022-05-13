import "./styles.css";

import { useState, useEffect } from "react";
import React from "react";
import Start from "./Start";
import Questions from "./Questions";
import { nanoid } from "nanoid";

function App() {
  const [trivia, setTrivia] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=23&type=multiple")
      .then((res) => res.json())
      .then((data) => setTrivia(data.results));
  }, []);

  useEffect(() => {
    function generateQuiz() {
      return trivia.map((item) => {
        const answer = [...item.incorrect_answers, item.correct_answer]
          .map((x) => [Math.random(), x])
          .sort(([a], [b]) => a - b)
          .map(([_, x]) => x);
        return {
          questions: item.question,
          answers: answer,
          correctAnswer: item.correct_answer,
          answered: false,
          id: nanoid()
        };
      });
    }
    setQuiz(generateQuiz());
  }, [trivia]);

  const questions = quiz.map((item) => {
    return (
      <Questions
        key={item.id}
        id={item.id}
        questions={item.questions}
        answers={item.answers}
        isAnswered={item.answered}
        correctAnswer={item.correctAnswer}
        handleAnswer={handleClick}
        // handleAnswer={() => handleClick(item.id)}
      />
    );
  });

  // function handleClick(id){
  //   setQuiz(oldQuiz => oldQuiz.map(item => {
  //     return id === item.id ? {...item, answered: !item.answered}: item
  //   }))
  // }

  function handleClick(event) {
    event.target.style.backgroundColor = "lightblue";
  }

  function beginQuiz() {
    setStartQuiz(true);
  }

  return (
    <div className="App">
      {startQuiz === false ? <Start startQuiz={beginQuiz} /> : questions}
    </div>
  );
}

export default App;
