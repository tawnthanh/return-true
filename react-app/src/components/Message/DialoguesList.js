import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export default function DialoguesList () {
    const [isLoaded, setIsLoaded] = useState(false);
    let dialogues = useSelector(store => store.dialogues);

    useEffect(()=>{
        if (dialogues.length > 0) {
            setIsLoaded(true)
        }
    },[dialogues])

    return <div className="sidebar">
        <div className="sidebar-title">
            <span>Logs</span>
        </div>
        {isLoaded && <div className="sidebar-list dialogues-list">
            <ul>
                {dialogues.map(dialogue => {
                    return <li key={`dialogue-list-item-${dialogue.dialogueId}`}>
                        <span>
                            <i className="fas fa-envelope"></i>
                            <Link to={`/messages/${dialogue.dialogueId}`}>{dialogue.user}</Link>
                        </span>
                    </li>
                })}
            </ul>
        </div>}
    </div>
}
