import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {openTab} from "../../store/tabs";
import {updateRequest} from "../../store/requests";

export default function Request () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("")
    const [request, setRequest] = useState({});
    let {id} = useParams();
    id = parseInt(id);
    const requests = useSelector(state => state.requests)

    const onSubmitEditTitle = e => {
        e.preventDefault();
        const editedRequest = {...request,title: title}
        dispatch(updateRequest(editedRequest));
        setEditMode(false);
    }

    useEffect(()=>{
        if (requests.length > 0){
            setRequest(requests.find(item => item.id===id));
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
    {!editMode && <div>
        <h1>{request.title}</h1>
        <i class="fas fa-edit" onClick={()=>{setEditMode(true)}}></i>
    </div>}
    {editMode && <form onSubmit={onSubmitEditTitle}>
        <input 
            type="text"
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
        />
    </form>}
    {request.answers.length>0 && <span className={"toggle toggle-"+(request.active?"on":"off")} 
    onClick={()=>{
        const editedRequest = {...request,active: !request.active}
        dispatch(updateRequest(editedRequest));
    }} ><span></span></span>}
    </>
}
