import React, {useState, useEffect,  } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { postMessages, removeMessages} from '../../store/message'


const Message = () => {
    const [message, setMessage] = useState("");
    const { userId, dialogueId }  = useParams();
    const dispatch = useDispatch();

    // const {message} = useSelector(state => state.message)

    console.log(message)

    const fullStore = useSelector(state => {
      return state.dialogueId
    })

    useEffect(() => {
        if (!userId && !dialogueId) {
          return
        }
        // (async () => {
        //   const response = await fetch(`/api/messages/${userId}`);
        //   const user = await response.json();
        //   setMessage(user);
        // })();
        dispatch(postMessages())
      }, [dispatch]);

    return (
      <div className="messagebox">
      <input
          name="message"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => {
        dispatch(postMessages(message, dialogueId))
      }}>Send Message</button>

     <button onClick={() => {
        dispatch(removeMessages())
      }}>Delete Message</button>
      {/* <input
          name="message"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={() => {
        dispatch({type: 'ADD_MESSAGE', name:'roses are red'})
      }}>Send Message</button>
       <button onClick={() => {
        dispatch({type: 'DELETE_MESSAGE'})
      }}>Delete Message</button> */}

      <div className="message-result">
          {message}
      </div>
  </div>
    );
}

export default Message;
