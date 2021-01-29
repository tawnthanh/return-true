import React from "react"
import {useSelector, useDispatch} from "react-redux"

export default function AnswerList () {
    const dispatch = useDispatch()
    let answers = useSelector(state => state.currentRequest.answers)
    let questions = useSelector(state => state.fixed.questions)
    return <>
    {answers.map(a=>{
        return(
        <span>{questions[a.questionId].question}: {a.answer}</span>
    )})}
    </>
}
