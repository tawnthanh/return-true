import React, {useEffect, useState} from "react";
import { ExtendedToggle } from "../Answers/QuestionTypes";

export function QuestionReversedToggleProfile ({question, setAnswers, answers}) {
  const [options, setOptions] = useState(["off","on"]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
      if (question.options.length>0) {
          setOptions(question.options)
      }
      setIsLoaded(true)
  },[question.options])


  return isLoaded && <span className="question-toggle">
    <label>{question.question}</label>
    <ExtendedToggle
      options={options}
      isOn={question.answer === undefined ? !question.answer : question.answer}
      onSwitch={() => { answers ? setAnswers() : setAnswers() }} />
  </span>
}

