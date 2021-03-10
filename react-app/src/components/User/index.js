import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import { getProfile } from "../../store/profile";

export default function User () {
    const dispatch = useDispatch();
    let {userId} = useParams();
    userId = (userId!==undefined) ? parseInt(userId) : userId;

    const [isLoaded, setisLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);

    let user = useSelector(state => state.session.user);

    useEffect(()=>{
        let id = (userId!==undefined) ? userId : (user ? user.id : undefined)
        if (id) {
            dispatch(getProfile(id)).then(res => {setisLoaded(true)})
        }
    },[dispatch, user, userId])

    useEffect(()=>{
        if (user && (!userId || userId===user.id)) setIsCurrent(true)
        else setIsCurrent(false);
    },[user, userId])

    if (!editMode) {
        return isLoaded && <Profile isCurrent={isCurrent} setEditMode={setEditMode} />
    } else {
        return isLoaded && <ProfileForm setEditMode={setEditMode} />
    }
}