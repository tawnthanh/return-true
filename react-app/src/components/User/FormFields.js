import React, {useEffect, useState} from "react";
import { ExtendedToggle } from "../Answers/QuestionTypes";

export function QuestionReversedToggleProfile ({question, setAnswers, isReversed}) {
  const [options, setOptions] = useState(["off","on"]);
  const [isOn, setIsOn] = useState(isReversed?true:false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
      if (question.options.length>0) {
          setOptions(question.options)
      }
      setIsLoaded(true)
  },[question.options])

  useEffect(()=>{
    if (isReversed) {
      setIsOn(!question.answer)
    } else {
      setIsOn(question.answer)
    }
},[question.answer, isReversed])

  return isLoaded && <span className="question-toggle">
    <label>{question.question}</label>
    <ExtendedToggle
      options={options}
      isOn={isOn}
      onSwitch={setAnswers} />
  </span>
}

