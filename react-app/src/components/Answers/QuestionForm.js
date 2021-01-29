import React, {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { QuestionMultipleChoice, QuestionRadiobutton, QuestionReversedToggle, QuestionToggle } from "./QuestionTypes"
import {saveAnswers} from "../../store/requests";

export default function QuestionForm () {
    const dispatch = useDispatch()
    let questions = useSelector(state => state.fixed.questions)
    let currentRequest = useSelector(state => state.currentRequest)
    const [answer1, setAnswer1] = useState(new Set());
    const [answer2, setAnswer2] = useState(new Set());
    const [answer3, setAnswer3] = useState();
    const [answer4, setAnswer4] = useState(new Set());
    const [answer5, setAnswer5] = useState();
    const [answer6, setAnswer6] = useState();
    const [answer7, setAnswer7] = useState();
    const [answer8, setAnswer8] = useState();
    const [answer9, setAnswer9] = useState();
    const state_list = {
        1: [answer1, setAnswer1],
        2: [answer2, setAnswer2],
        3: [answer3, setAnswer3],
        4: [answer4, setAnswer4],
        5: [answer5, setAnswer5],
        6: [answer6, setAnswer6],
        7: [answer7, setAnswer7],
        8: [answer8, setAnswer8],
        9: [answer9, setAnswer9],
    }

    const onSubmit = e => {
        e.preventDefault();
        
        const request_answers = []

        for (let key in state_list) {
            let item = state_list[key]

            // console.log(typeof item[0] === "object", (typeof item[0] === "object")?item[0].size:typeof item[0])
            if (typeof item[0] === "object" && item[0].size > 0){
                request_answers.push({
                    "questionId": parseInt(key),
                    "answer": Array.from(item[0]).join(",")
                })
            } else if (typeof item[0] === "boolean"){
                request_answers.push({
                    "questionId": parseInt(key),
                    "answer": item[0]?"1":"0"
                })
            } else if (typeof item[0] !== "undefined" && typeof item[0] !== "object"){
                request_answers.push({
                    "questionId": parseInt(key),
                    "answer": item[0]
                })
            }
        }
        dispatch(saveAnswers(currentRequest.id, request_answers))
    }


    return <>
    <form onSubmit={onSubmit}>
        {Object.entries(questions).map(item=>{
            const q = item[1];
            if (q.question_type === 3) {
                return <QuestionRadiobutton question={q} setAnswers={state_list[q.id][1]} answers={state_list[q.id][0]}/>
            }
            else if (q.question_type === 4 && q.id===8) {
                return <QuestionReversedToggle question={q} setAnswers={state_list[q.id][1]} answers={state_list[q.id][0]} />
            }
            else if (q.question_type === 4 && q.id!==8) {
                return <QuestionToggle question={q} setAnswers={state_list[q.id][1]} answers={state_list[q.id][0]}/>
            }
            else return <QuestionMultipleChoice question={q} setAnswers={state_list[q.id][1]} answers={state_list[q.id][0]}/>
        })}
        <button type="submit">Open search</button>
    </form>
    </>
}
