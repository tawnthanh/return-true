import React from "react"
import {useSelector, useDispatch} from "react-redux"

export default function AnswerList () {
    const dispatch = useDispatch()
    let answers = useSelector(state => state.currentRequest.answers)
    let questions = useSelector(state => state.fixed.questions)
    let languages = useSelector(state => state.fixed.languages)
    let frequencies = useSelector(state => state.fixed.frequencies)
    let expertise = useSelector(state => state.fixed.expertise)
    return <div className="answers-query">
        <span>SELECT * </span>
        <span>FROM Users</span>
        <span className="answers-list">
            {answers.map(a=>{
                let q = questions[a.questionId]
                let options = q.options
                if ([1,2].includes(q.question_type)){
                    let aArr = a.answer.split(",")
                    aArr = aArr.map(item => {
                        if (options==="languages"){
                            return languages[item].type
                        } else if (options==="expertise"){
                            return expertise[item].type
                        } else {
                            return options.split(",")[parseInt(item)]
                        }
                    })
                    return  <span>
                                {q.question} IN [{aArr.join(", ")}]
                            </span>
                } else if ([4,5].includes(q.question_type)) {
                    let aArr = q.options.split(",")
                    
                    if (aArr.length<2){
                        return  <span>
                                    {q.question}
                                </span>
                    } else {
                        console.log(">=2",aArr, a)
                        if (q.question_type==5) aArr.reverse()
                        return  <span>
                                    {q.question} = {aArr[parseInt(a.answer)]}
                                </span>
                        
                    }
                } else {
                    if (options==="frequencies"){
                        return <span>
                                    {q.question} = {frequencies[parseInt(a.answer)].type}
                                </span>
                    } else {
                        let aArr = q.options.split(",")
                        return  <span>
                                    {q.question} = {aArr[parseInt(a.answer)]}
                                </span>
                    }
                }
            })}
        </span>
    </div>
}
