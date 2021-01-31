import React from "react"
import {useSelector} from "react-redux"
import AnswerList from "./AnswerList";
import QuestionForm from "./QuestionForm";
import Match from "../Match";

export default function Answer () {
    let answers = useSelector(state => state.currentRequest.answers)
    
    if (answers.length > 0) {
        return <>
        <AnswerList />
        <Match />
        </>
    } else {
        return <QuestionForm />
    }
}
