import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import "./Answers.css";

export function QuestionMultipleChoice ({question, setAnswers, answers}) {
    const [options, setOptions] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const languages_list = useSelector(state=>state.fixed.languages)
    const expertise_list = useSelector(state=>state.fixed.expertise)
    
    useEffect(()=>{
        if (question.options === "languages") {
            setOptions(languages_list)
        } else if (question.options === "expertise") {
            setOptions(expertise_list)
        } else {
            let options_list = question.options.split(",")
            let customOptions = {}
            options_list.forEach((opt, idx) => {
                customOptions[idx]={id:idx,type:opt}
            })
            setOptions(customOptions)
        }
        setIsLoaded(true)
    },[])

    return isLoaded && <>
    <h3>{question.question}</h3>
    {Object.values(options).map(o=>{
        return <div>
            <input type="checkbox" 
                onChange={e=>{
                    let new_answers = new Set(answers)
                    if (new_answers.has(e.target.value))
                        new_answers.delete(e.target.value)
                    else new_answers.add(e.target.value)
                        
                    // console.log(new_answers)
                    setAnswers(new_answers)
                }} 
                value={o.id} 
                id={`q${question.id}-o${o.id}`}
                name={`q${question.id}`}
            />
            <label htmlFor={`q${question.id}-o${o.id}`} >{o.type}</label>
            </div>
    })}
    </>
}

export function QuestionRadiobutton ({question, setAnswers, answers}) {
    const [options, setOptions] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const frequencies_list = useSelector(state=>state.fixed.frequencies)

    useEffect(()=>{
        if (question.options === "frequencies") {
            setOptions(frequencies_list)
        } else {
            let options_list = question.options.split(",")
            let customOptions = {}
            options_list.forEach((opt, idx) => {
                customOptions[idx]={id:idx,type:opt}
            })
            setOptions(customOptions)
        }
        setIsLoaded(true)
    },[])

    useEffect(()=>{
        console.log(question.question,": ",answers)
    },[answers])

    return isLoaded && <>
    <h3>{question.question}</h3>
    {Object.values(options).map(o=>{
        return <div>
            <input type="radio" 
                onChange={e=>{
                    setAnswers(e.target.value)
                }} 
                value={o.id} 
                id={`q${question.id}-o${o.id}`}
                name={`q${question.id}`}
            />
            <label htmlFor={`q${question.id}-o${o.id}`} >{o.type}</label>
            </div>
    })}
    </>
}

export function QuestionToggle ({question, setAnswers, answers}) {
    const [options, setOptions] = useState(["off","on"]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        if (question.options.length>0) {
            let options_list = question.options.split(",")
            setOptions(options_list)
        }
        setIsLoaded(true)
    },[])


    return isLoaded && <>
    <h3>{question.question}</h3>
    <span>{options[0]}</span>
    <Toggle isOn={answers} onSwitch={()=>{answers===undefined?setAnswers(true):setAnswers(!answers)}}/>
    <span>{options[1]}</span>
    </>
}

export function QuestionReversedToggle ({question, setAnswers, answers}) {
    const [options, setOptions] = useState(["off","on"]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        if (question.options.length>0) {
            let options_list = question.options.split(",")
            setOptions(options_list)
        } 
        setIsLoaded(true)
    },[])


    return isLoaded && <>
    <h3>{question.question}</h3>
    <span>{options[0]}</span>
    <Toggle isOn={answers===undefined?answers:!answers} onSwitch={()=>{answers===undefined?setAnswers(false):setAnswers(!answers)}}/>
    <span>{options[1]}</span>
    </>
}

export function Toggle({isOn, onSwitch}){
    const [stateClass, setStateClass] = useState("")

     useEffect(()=>{
         console.log(isOn)
         if (isOn!==undefined) setStateClass(" toggle-"+(isOn?"on":"off"))
     },[isOn])

    return <span className={"toggle"+stateClass} 
    onClick={onSwitch} ><span></span></span>
}
