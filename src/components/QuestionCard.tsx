import React from "react";
import { AnswerObj } from "../App";
import {Wrapper, ButtonWrapper} from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  questionNumber: number;
  totalQuestions: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <div>
    <p className="number">
      Question {questionNumber} / {totalQuestions}
    </p>

    <p dangerouslySetInnerHTML={{ __html: question }} />

    {answers.map((answer) => {
      return (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          {/* !!: to convert into boolean value */}
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span>
              <p dangerouslySetInnerHTML={{ __html: answer }} />
            </span>
          </button>
        </ButtonWrapper>
      );
    })}
  </div>
);
