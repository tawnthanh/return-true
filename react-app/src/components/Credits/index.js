import React, {useState, useEffect} from "react";
import "./Credits.css";


const Credits = () => {
  const [anna, setAnna] = useState(false);
  const [mishe, setMishe] = useState(false);
  const [arjun, setArjun] = useState(false);
  const [thanh, setThanh] = useState(false);

  const activate = (name) => {
    if(name === "Anna Bullard") setAnna(!anna)
    else if(name === "Arjun Narain") setArjun(!arjun)
    if(name === "Michelle Yi") setMishe(!mishe)
    if (name === "Thanh Nguyen") setThanh(!thanh)
    return;
  }

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
      "linkedIn": "https://www.linkedin.com/in/thanh-nguyen-15a50437/"},
  ]

  return (
    <div className="credits-location">
      <span className="credit-header">
        <h1 className="start">{"const"}</h1>
        <h1 className="end">{"team = {"}</h1>

      </span>
      <div className="creditor-section">
        <h3 className={anna ? "color-name" : " "} onClick={()=>activate(creditors[0].name)}>{creditors[0].name}, </h3>
          { anna &&
          <div className="info-section">
            <img src={creditors[0].picture}></img>
            {"["}
            <a href={creditors[0].github}>{"github"}</a>,
            <a href={creditors[0].linkedIn}>{"linkedIn"}</a>
            {"]"}
            </div>}
        <h3 className={arjun ? "color-name" : " "} onClick={()=>activate(creditors[2].name)}>{creditors[2].name}, </h3>
        { arjun &&
          <div className="info-section">
          <img src={creditors[2].picture}></img>
          {"["}
          <a href={creditors[2].github}>{"github"}</a>,
          <a href={creditors[2].linkedIn}>{"linkedIn"}</a>
          {"]"}
          </div>}
        <h3 className={mishe ? "color-name" : " "} onClick={()=>activate(creditors[1].name)}>{creditors[1].name}, </h3>
          { mishe &&
          <div className="info-section">
          <img src={creditors[1].picture}></img>
          {"["}
          <a href={creditors[1].github}>{"github"}</a>,
          <a href={creditors[1].linkedIn}>{"linkedIn"}</a>
          {"]"}
          </div>}
        <h3 className={thanh ? "color-name" : " "} onClick={()=>activate(creditors[3].name)}>{creditors[3].name},</h3>
        { thanh &&
          <div className="info-section">
          <img src={creditors[3].picture}></img>
          {"["}
          <a href={creditors[3].github}>{"github"}</a>,
          <a href={creditors[3].linkedIn}>{"linkedIn"}</a>
          {"]"}
          </div>}
      </div>
      <h1 className="end">{"}"}</h1>
    </div>
  )
}

export default Credits;
