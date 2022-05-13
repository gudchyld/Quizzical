import React from "react";

export default function Questions({
  questions,
  answers,
  correctAnswer,
  isAnswered,
  id,
  handleAnswer
}) {
  return (
    <div className="questions">
      <h3 className="questions--title">{questions}</h3>
      <div className="questions--button">
        {answers.map((answer) => {
          // const specialClass = isAnswered ?
          //                     (answer === correctAnswer ? "green" : "red"): "";

          return (
            <button className={`button--button`} onClick={handleAnswer}>
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}
