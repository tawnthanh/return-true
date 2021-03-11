import React, { useState, useEffect, useRef, useCallback } from "react";
import {NavLink,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {closeTab} from "../store/tabs";
import 'font-awesome/css/font-awesome.min.css';

function Tab ({tab}) {
  let history = useHistory();
  const dispatch = useDispatch();

  return <NavLink exact to={tab.link} style={{color:"#fff"}} activeClassName="active-tab" className="tab">
          <span alt={tab.title}>{tab.title}</span>
          <i className="fa fa-times" onClick={async () => {
            const nextLink = await dispatch(closeTab(tab.tab_id))
            history.push(nextLink);
          }}></i>
  </NavLink>
}

export default function TabBar ({setTabBarHeight}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const tb = useRef();

    const tabs = useSelector(store => store.tabs);

    const tbHeightCheck = useCallback(() => {
      let height = (tb.current && tb.current.offsetHeight>28)?tb.current.offsetHeight:28;
      setTabBarHeight(height);

    }, [setTabBarHeight])

    useEffect(()=>{
        setIsLoaded(true)
    },[])

    useEffect(tbHeightCheck,[tabs, window.innerWidth]);
    window.addEventListener('resize', tbHeightCheck)
    
    return (isLoaded && <div className="tabbar" ref={tb}>
        {Object.entries(tabs).map((tab)=>{
          return <Tab tab={tab[1]} key={tab[0]}/>
        })}
    </div>)
}


