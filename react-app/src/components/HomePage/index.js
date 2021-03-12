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
        <h1>Welcome</h1>
        <div className="homepage">
            <p>Return True is a clone of OkCupid that will allow all different types of developers to reach out to each other and connect! The application's main purpose is to help individuals find their coding pair/team based on what they need and if they match based on the results of their survey.</p>
            <p>To learn more visit <a href="https://github.com/tawnthanh/return-true" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>
    </>
}
