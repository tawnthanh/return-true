import React, {useState, useEffect,  } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getMessages, addMessage } from '../../store/message';
import { getDialogues } from "../../store/dialogues";
import { openTab } from '../../store/tabs';
import './message.css'

const Message = () => {
    const [message, setMessage] = useState("");
    const { dialogueId }  = useParams();
    const dispatch = useDispatch();

    const dialogues = useSelector(state => state.dialogues)

    const user = useSelector(state => {
      return state.session.user
    })

    const fullStore = useSelector(state => state.message)

    useEffect(() => {
      dispatch(getMessages(dialogueId))
      dispatch(getDialogues())
    }, [dispatch, dialogueId])

    useEffect(()=>{
      let d = dialogues.find(i=>i.dialogueId === parseInt(dialogueId));
      if (d) {
        let tab = {
          tab_id: `dialogue_${dialogueId}`,
          title: d.user,
          link: `/messages/${dialogueId}`
        }
        dispatch(openTab(tab));
      }
    },[dialogues, dispatch, dialogueId])

    return (
      <div className="messagebox">
        <form className="messages">
          <input className="inputbox"
              name="message"
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <button className="messagebutton" onClick={(e) => {
            e.preventDefault()
            dispatch(addMessage(dialogueId,message))
          }}>sendMessage()</button>

        </form>


      <div className="message-result">
          {message}

      </div>
      <div>
       {!!fullStore && fullStore.length>0 && fullStore.map((msg)=> {

          return <div className={`${(user.id === msg.senderId)? "mymessage" : "othersMessage"}`} key={`msg_${msg.id}`}>{msg.message}</div>

        })}
      </div>
    </div>
    )
}

export default Message;
