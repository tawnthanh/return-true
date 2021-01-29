import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {createRequest, getRequests, destroyRequest} from "../../store/requests";
import {openTab, closeTab} from "../../store/tabs";
import "./request.css";

export default function RequestList () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    let requests = useSelector(store => store.requests)

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(createRequest(title));
        if (!res.errors) {
            setTitle("");
            setIsOpen(false);
            const new_request = res.request;
            await dispatch(openTab({
                tab_id: `request-${new_request.id}`,
                title: `${new_request.title}`,
                link: `/request/${new_request.id}`,
            }))
            history.push(`/request/${new_request.id}`)
        } else {
            setErrors(res.errors);
        }
    }

    useEffect(()=>{
        dispatch(getRequests())
    },[dispatch])

    return <div className="sidebar">
        <div className="sidebar-title">
            <span>Requests</span>
            <i className="fas fa-times-circle" 
            style={isOpen?{transition: "transform 0.5s"}:{transform: "rotate(45deg)", transition: "transform 0.5s"}}
            onClick={()=>{setIsOpen(!isOpen)}}
            ></i>
        </div>
        <div className="sidebar-list">
            <ul>
                {requests.map(request => {
                    return <li className={request.active?"active":""} key={`request-list-item-${request.id}`}>
                        <span>
                            <i className="fas fa-database list-marker"></i> 
                            <Link to={`/request/${request.id}`}> {request.title}</Link>
                        </span>
                        <i className="fas fa-trash" 
                        onClick={()=>{
                            dispatch(destroyRequest(request.id))
                            dispatch(closeTab(`request-${request.id}`))
                            }}></i>
                    </li>
                })}
            </ul>
            {isOpen && <form onSubmit={onSubmit}>
                <input type="text" maxLength="50"
                    onChange={e=>{setTitle(e.target.value)}}
                    value={title}
                />
                <ul className="errorList">
                    {errors.map(e=>(
                        <li>{e}</li>
                    ))}
                </ul>
            </form>}
        </div>
    </div>
}
