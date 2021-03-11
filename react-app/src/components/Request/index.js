import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {openTab} from "../../store/tabs";
import {updateRequest, getRequests} from "../../store/requests";
import {getCurrent} from "../../store/currentRequest";
import Answer from "../Answers/";
import {Toggle, ExtendedToggle} from "../Answers/QuestionTypes";

export default function Request () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isBoth, setIsBoth] = useState(true);
    const [title, setTitle] = useState("")
    const history = useHistory();
    let {id} = useParams();
    id = parseInt(id);

    const requests = useSelector(state => state.requests)
    const request = useSelector(state=> state.currentRequest)

    const onSubmitEditTitle = e => {
        e.preventDefault();
        const editedRequest = {...request,title: title}
        dispatch(updateRequest(editedRequest));
        setEditMode(false);
    }

    useEffect(()=>{
        dispatch(getRequests());
    },[dispatch])

    useEffect(()=>{
            let curr = requests.find(item => item.id===id)
            if (requests.length>0 && !curr) {
                history.push("/")
            }
            if (curr){
                if (requests.length>0) {
                    dispatch(getCurrent(curr))
                    setIsLoaded(true)
                }
            } else {
                setIsLoaded(false)
            }
    },[requests, id, dispatch, history])

    useEffect(()=>{
        if (Object.keys(request).length > 0) {
            let tab = {
                tab_id: `request-${id}`,
                title: request.title,
                link: `/request/${id}`
            }
            setTitle(request.title)
            dispatch(openTab(tab))
        }
    },[request,dispatch,id])

    return isLoaded && <>
    {!editMode && <div className="h1 with-edit">
        <h1>{request.title}</h1>
        <i className="fas fa-edit" onClick={()=>{setEditMode(true)}}></i>
        {request.answers.length > 0 &&
        <Toggle isOn={request.active}  onSwitch={()=>{
            const editedRequest = {...request,active: !request.active}
            dispatch(updateRequest(editedRequest));
        }} />}
        {request.answers.length > 0 && request.active &&
        <ExtendedToggle isOn={isBoth}  onSwitch={()=>{setIsBoth(!isBoth)}} options={["one way", "both ways"]} />}
    </div>}
    {editMode && <form onSubmit={onSubmitEditTitle}>
        <input
            className="code-edit h1"
            type="text"
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
        />
    </form>}

        <Answer isBoth={isBoth} />
    </>
}
