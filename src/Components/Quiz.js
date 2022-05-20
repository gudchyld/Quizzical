import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(0);

  console.log(quizData);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuizData(() => {
          return data.results.map((question) => {
            // 1 level map

            const incorrectAnswer = question.incorrect_answers.map((item) => {
              return {
                value: item,
                isClicked: false,
                isCorrect: false,
                id: nanoid()
              };
            }); // 2 level map

            const correctAnswer = {
              value: question.correct_answer,
              isClicked: false,
              isCorrect: true,
              id: nanoid()
            };

            const combinedAnswers = [...incorrectAnswer, correctAnswer]
              .map((x) => [Math.random(), x])
              .sort(([a], [b]) => a - b)
              .map(([_, x]) => x);

            return {
              question: question.question,
              answers: combinedAnswers,
              id: nanoid()
            };
          }); // data.results.map
        })
      ); //second then
  }, [resetQuiz]); // end useEffect

  function updateClicked(qID, aID) {
    setQuizData((oldData) => {
      return oldData.map((question) => {
        if (qID !== question.id) {
          return question;
        } else {
          const newAnswers = question.answers.map((item) => {
            return aID === item.id
              ? { ...item, isClicked: true }
              : { ...item, isClicked: false };
          });
          return { ...question, answers: newAnswers };
        }
      });
    });
  }

  const questionElements = quizData.map((elements) => {
    return (
      <Question
        key={nanoid()}
        question={elements.question}
        allAnswers={elements.answers}
        updateClicked={updateClicked}
        qID={elements.id}
      />
    );
  });

  return (
    <div className="quiz">
      {questionElements}
      <div className="quiz--btn-chk">
        <button
          className="button--button"
          style={{
            marginTop: 30,
            padding: 15,
            backgroundColor: "skyblue",
            fontSize: 15
          }}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}
