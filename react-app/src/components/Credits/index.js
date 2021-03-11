import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import "./Credits.css";
import { openTab } from '../../store/tabs';


const Credits = () => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
      let tab = {
        tab_id: `credits`,
        title: `Credits`,
        link: `/credits`
      }
      dispatch(openTab(tab));
  },[dispatch])

  const creditors = [
    {
      "name": "Anna Bullard",
      "picture": "https://avatars.githubusercontent.com/u/70282021?s=460&u=203359870d6d3c5753f5bd4d42fd8d4a88efae57&v=4",
      "github": "https://github.com/AnnaBullard",
      "linkedIn": "https://www.linkedin.com/in/anna-bullard-38a9521bb/"
    },
    {
      "name": "Michelle Yi",
      "picture": "https://ca.slack-edge.com/T03GU501J-U018PAJPU6S-a0efd069413a-512",
      "github": "https://github.com/M-eLL",
      "linkedIn": "https://www.linkedin.com/in/michelle-sangeun-yi/"
    },
    {
      "name": "Arjun Narain",
      "picture": "https://avatars.githubusercontent.com/u/70171739?s=460&u=862128cc2a0e9872fc7325b460553f83531c496d&v=4",
      "github": "https://github.com/Anarain248",
      "linkedIn": "https://www.linkedin.com/in/arjun-narain-5a5519101/"
    },
    {
      "name": "Thanh Nguyen",
      "picture": "https://avatars.githubusercontent.com/u/68927247?s=460&u=4f907d4fc48e1274271950f46a3e1879242bb6e8&v=4",
      "github": "https://github.com/tawnthanh",
      "linkedIn": "https://www.linkedin.com/in/thanh-nguyen-15a50437/"
    }
  ]

  return (
    <div className="credits-location">
        <h1 className="credit-header">
          <span className="keyword">const</span>
          <span className="varName">team</span>
          {" = ["}
        </h1>
      <div className="creditor-section">
        {creditors.map(creditor => {
          return <div className="member">
            <img src={creditor.picture} alt={creditor.name} />
            <div><span className="key">name: </span><span className="value">{creditor.name}</span></div>
            <div>
              <span className="key">links: </span>
              <ul className="value">
                <a href={creditor.github}>{"github"}</a>,
                <a href={creditor.linkedIn}>{"linkedIn"}</a>
              </ul>
            </div>
          </div>
        })}
      </div>
      <h1 className="end closing">{"]"}</h1>
    </div>
  )
}

export default Credits;
