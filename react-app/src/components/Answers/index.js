import React from "react"
import {useSelector} from "react-redux"
import AnswerList from "./AnswerList";
import QuestionForm from "./QuestionForm";

export default function Answer () {
    let answers = useSelector(state => state.currentRequest.answers)
    
    if (answers.length > 0) {
        return <AnswerList />
    } else {
        return <QuestionForm />
    }
}
