import React, { useState, useEffect } from "react";
import {NavLink,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {openTab, closeTab} from "../store/tabs";
import 'font-awesome/css/font-awesome.min.css';

function Tab ({tab}) {
  let history = useHistory();
  const dispatch = useDispatch();

  console.log("tab-history", history)

  return <NavLink exact to={tab.link} style={{color:"#fff"}} activeClassName="active-tab" className="tab">
          <span alt={tab.title}>{tab.title}</span>
          <i className="fa fa-times" onClick={async () => {
            const nextLink = await dispatch(closeTab(tab.tab_id))
            history.push(nextLink);
          }}></i>
  </NavLink>
}

export default function TabBar () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const tabs = useSelector(store => store.tabs);

    useEffect(()=>{
        let tab3 = {
            tab_id: "home",
            title: "home",
            link: "/"
          }

        dispatch(openTab(tab3))
        setIsLoaded(true)
    },[])
    
    return (isLoaded && <div className="tabbar">
        {Object.entries(tabs).map((tab)=>{
          return <Tab tab={tab[1]} key={tab[0]}/>
        })}
    </div>)
}


