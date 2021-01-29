import React from "react"
import {useSelector, useDispatch} from "react-redux"
import AnswerList from "./AnswerList";
import QuestionForm from "./QuestionForm";

export default function Answer () {
    const dispatch = useDispatch()
    let answers = useSelector(state => state.currentRequest.answers)
    let questions = useSelector(state => state.questions)
    
    if (answers.length > 0) {
        return <AnswerList />
    } else {
        return <QuestionForm />
    }
}
