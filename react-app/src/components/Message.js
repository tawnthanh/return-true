import React, {useState, useEffect, } from 'react';
import {useParams} from 'react-router-dom';


const Message = () => {
    const [message, setMessage] = useState("");
    const { userId, dialogueId }  = useParams();

    useEffect(() => {
        if (!userId && !dialogueId) {
          return
        }
        (async () => {
          const response = await fetch(`/api/messages/${userId}`);
          const user = await response.json();
          setMessage(user);
        })();
      }, [dialogueId]);

    return (
        <div className="chat">
            <h3>returnTrue Chat</h3>
        </div>
    );
}

export default Message;
