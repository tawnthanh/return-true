import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {openTab} from "../../store/tabs";
import {updateRequest} from "../../store/requests";
import {getCurrent} from "../../store/currentRequest";
import Answer from "../Answers/";
import {Toggle} from "../Answers/QuestionTypes";

export default function Request () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("")
    // const [request, setRequest] = useState({});
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
        let curr = requests.find(item => item.id===id)
        if (curr){
            if (requests.length>0) dispatch(getCurrent(curr))
            setIsLoaded(true)
        } else {
            setIsLoaded(false)
        }
    },[requests,id])

    useEffect(()=>{
        if (Object.keys(request).length > 0) {
            setIsLoaded(true)
            let tab = {
                tab_id: `request-${id}`,
                title: request.title,
                link: `/request/${id}`
            }
            setTitle(request.title)
            dispatch(openTab(tab))
        }
    },[request])

    return isLoaded && <>
    {!editMode && <div className="h1 with-edit">
        <h1>{request.title}</h1>
        <i className="fas fa-edit" onClick={()=>{setEditMode(true)}}></i>
    </div>}
    {editMode && <form onSubmit={onSubmitEditTitle}>
        <input 
            className="code-edit h1"
            type="text"
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
        />
    </form>}
    {request.answers.length > 0 &&
        <Toggle isOn={request.active}  onSwitch={()=>{
            const editedRequest = {...request,active: !request.active}
            dispatch(updateRequest(editedRequest));
        }} />}
        <Answer/>
    </>
}
