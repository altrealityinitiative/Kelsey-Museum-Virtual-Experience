import React, {useState} from "react";
import type {QuizQuestion} from "../../content/experiences";
export interface QuizState {index: number; selected: number | null; submitted: boolean; score: number; finished: boolean;}
export const initialQuiz = (): QuizState => ({index: 0, selected: null, submitted: false, score: 0, finished: false});
export function submitAnswer(state: QuizState, answer: number): QuizState {
  return state.submitted || state.selected === null ? state : {...state, submitted: true, score: state.score + Number(state.selected === answer)};
}
export function Quiz({questions}: {questions: QuizQuestion[]}) {
  const [state, setState] = useState(initialQuiz);
  const question = questions[state.index];
  if (state.finished) return <section aria-live="polite"><h3>Quiz complete!</h3><p>You scored {state.score} out of {questions.length}.</p><button onClick={() => setState(initialQuiz())}>Try again</button></section>;
  return <section><p>Question {state.index + 1} of {questions.length} · Score: {state.score}</p>
    <fieldset disabled={state.submitted}><legend>{question.prompt}</legend>{question.choices.map((choice, i) => <label className="quiz-choice" key={choice}><input type="radio" name="answer" checked={state.selected === i} onChange={() => setState({...state, selected: i})}/>{choice}</label>)}</fieldset>
    {state.submitted ? <div aria-live="polite"><h3>{state.selected === question.answer ? "Correct!" : `The answer is ${question.choices[question.answer]}.`}</h3><p>{question.explanation}</p><button onClick={() => setState(state.index === questions.length - 1 ? {...state, finished: true} : {...state, index: state.index + 1, selected: null, submitted: false})}>{state.index === questions.length - 1 ? "See results" : "Next question"}</button></div> : <button disabled={state.selected === null} onClick={() => setState(previous => submitAnswer(previous, question.answer))}>Submit Answer</button>}
  </section>;
}
