import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import { getProfile } from "../../store/profile";
import {openTab} from "../../store/tabs";

export default function User () {
    const dispatch = useDispatch();
    let {userId} = useParams();
    userId = (userId!==undefined) ? parseInt(userId) : userId;

    const [isLoaded, setisLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);

    let user = useSelector(state => state.session.user);
    let profile = useSelector(state => state.profile);

    useEffect(()=>{
        let id = (userId!==undefined) ? userId : (user ? user.id : undefined)
        if (id) {
            dispatch(getProfile(id)).then(res => {
                if (user && (!userId || userId===user.id)) setIsCurrent(true)
                else setIsCurrent(false);
                setisLoaded(true)
            })
        }
    },[dispatch, user, userId])

    useEffect(() => {
        if (isLoaded && profile && (isCurrent || profile.id)) {
            let tab = {
                tab_id: `profile${isCurrent?"":"-"+profile.id}`,
                title: `${profile.first_name} ${profile.last_name}`,
                link: `/users${isCurrent?"":"/"+profile.id}`
            }
            dispatch(openTab(tab))
            if(isLoaded && Object.values(profile).length===0 && isCurrent) {
                setEditMode(true);
            }
        }

    },[dispatch, profile, isCurrent, isLoaded]);


    if (isLoaded && Object.values(profile).length===0 && !isCurrent)
        return <Redirect to="/" />


    if (!editMode) {
        return isLoaded && <Profile isCurrent={isCurrent} setEditMode={setEditMode} />
    } else {
        return isLoaded && <ProfileForm setEditMode={setEditMode} />
    }
}