import React from "react"
import {useSelector} from "react-redux"
import AnswerList from "./AnswerList";
import QuestionForm from "./QuestionForm";
import Match from "../Match";

export default function Answer (isBoth) {
    let answers = useSelector(state => state.currentRequest.answers)
    
    if (answers.length > 0) {
        return <>
        <AnswerList />
        <Match isBoth={isBoth} />
        </>
    } else {
        return <QuestionForm />
    }
}
