import React, { useEffect, useState } from "react"
import {useSelector} from "react-redux"

export default function AnswerList () {
    const [isLoaded, setIsLoaded] = useState(false);

    let answers = useSelector(state => state.currentRequest.answers)
    let questions = useSelector(state => state.fixed.questions)
    let languages = useSelector(state => state.fixed.languages)
    let frequencies = useSelector(state => state.fixed.frequencies)
    let expertise = useSelector(state => state.fixed.expertise)

    useEffect(()=>{
        if (answers && questions && Object.keys(questions).length>0) {
            setIsLoaded(true);
        }
    },[answers,questions])

    return isLoaded && <div className="answers-query">
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
                    return  <span key={`answer-list-item${a.id}`}>
                                {q.question} IN [{aArr.join(", ")}]
                            </span>
                } else if ([4,5,6].includes(q.question_type)) {
                    let aArr = q.options.split(",")
                    
                    if (aArr.length<2){
                        return  <span key={`answer-list-item${a.id}`}>
                                    {q.question}
                                </span>
                    } else {
                        if (q.question_type===5) aArr.reverse()
                        return  <span key={`answer-list-item${a.id}`}>
                                    {q.question} = {aArr[parseInt(a.answer)]}
                                </span>
                        
                    }
                } else {
                    if (options==="frequencies"){
                        return <span key={`answer-list-item${a.id}`}>
                                    {q.question} = {frequencies[parseInt(a.answer)].type}
                                </span>
                    } else {
                        let aArr = q.options.split(",")
                        return  <span key={`answer-list-item${a.id}`}>
                                    {q.question} = {aArr[parseInt(a.answer)]}
                                </span>
                    }
                }
            })}
        </span>
    </div>
}
