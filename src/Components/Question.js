import React from "react";
import he from "he";
import { nanoid } from "nanoid";

export default function Question({
  question,
  allAnswers,
  qID,
  updateClicked,
  showAnswer
}) {
  //map through allAnswers array and get value,isClicked,isCorrect and id
  const answerElements = allAnswers.map((answer) => {
    let styles = {
      backgroundColor: answer.isClicked ? "lightblue" : "transparent"
    };

    if (showAnswer) {
      if (answer.isCorrect) {
        styles = { backgroundColor: "lightgreen" };
      } else if (answer.isClicked && !answer.isCorrect) {
        styles = { backgroundColor: "lightpink" };
      }
    }

    return (
      <button
        key={nanoid()}
        className="button--button"
        onClick={(event) => updateClicked(qID, answer.id)}
        style={styles}
      >
        {he.decode(answer.value)}{" "}
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
