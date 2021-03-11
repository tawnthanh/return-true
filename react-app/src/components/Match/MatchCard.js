import React from "react";
import {Link} from "react-router-dom";

export default function MatchCard ({match}) {

    return <div className="match-card"> 
        <Link to={`/user/${match.user.userId}`} className="image-link">
            <img src={match.user.imageUrl?match.user.imageUrl:"default.jpeg"} alt={match.user.username} />
        </Link>
        <span className="username-bloc"><Link to={`/user/${match.user.userId}`}>{match.user.username}</Link></span>
        <span className="match-block">
        <span className="percentage-bloc">
            <span className="inactive-percent" style={{width:`${100-Math.round(match.match*100)}%`}}></span>
            <span className="cell-blocks">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </span>
        </span>
        {Math.round(match.match*100)}%
        </span>
    </div>
}
