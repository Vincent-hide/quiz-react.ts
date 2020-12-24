import React, { useState } from "react";
import "./App.scss";
import { QuestionCard } from "./components/QuestionCard";
import {
  fetchQuizQuestions,
  Difficulty,
  QuestionState,
} from "./components/API";
import { RingLoader } from "react-spinners";

import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]); // declared as an empty array of QuestionState
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      // check the answer is correct
      const correct = questions[number].correct_answer === answer;
      // if correct, increment the score
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestions = () => {
    // move on to the next question, if not the last question
    const nextQuestions = number + 1;

    if (nextQuestions === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestions);
    }
  };

  const validate = (): boolean => {
    if (
      !gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {loading ? (
        <div className="spinner">
          <RingLoader size={250} color="skyblue" />
        </div>
      ) : (
        <>
          <GlobalStyle />
          <Wrapper>
            <h1>React Quiz</h1>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <button className="start" onClick={startTrivia}>
                start
              </button>
            ) : null}

            {!gameOver ? <p className="score">Score: {score}</p> : null}

            {console.log(questions)}
            {!gameOver && (
              <QuestionCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number]?.question}
                answers={questions[number]?.answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
            )}

            {validate() ? (
              <button className="next" onClick={nextQuestions}>
                Next Question
              </button>
            ) : null}
          </Wrapper>
        </>
      )}
    </div>
  );
};

export default App;
