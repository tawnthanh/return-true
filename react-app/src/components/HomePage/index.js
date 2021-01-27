import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {openTab} from "../../store/tabs";

export default function HomePage () {
    const dispatch = useDispatch();

    useEffect(()=>{
        let tab = {
            tab_id: "home",
            title: "home",
            link: "/"
          }
        dispatch(openTab(tab));
    },[dispatch])

    return <>
        <h1>My Home Page</h1>
    </>
}
