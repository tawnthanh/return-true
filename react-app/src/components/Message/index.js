import React, {useState, useEffect,  } from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getMessages, addMessage } from '../../store/message';
import { openTab } from '../../store/tabs';
import './message.css'

export default function Message ({tabBarHeight}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [current, setCurrent] = useState("");
    const [messageBox, setMessageBox] = useState({height:"100px"});
    const { dialogueId }  = useParams();
    const dispatch = useDispatch();

    const dialogues = useSelector(state => state.dialogues)

    const user = useSelector(state => {
      return state.session.user
    })

    const messages = useSelector(state => state.messages)

    useEffect(() => {
      dispatch(getMessages(dialogueId)).then(res => setIsLoaded(true));
    }, [dispatch, dialogueId])

    useEffect(()=>{
      setCurrent(dialogues.find(i=>i.dialogueId === parseInt(dialogueId)));
    },[dialogues, dialogueId])

    useEffect(()=>{
      let height = window.innerHeight-135-tabBarHeight;
      setMessageBox({height:`${height}px`})
    },[tabBarHeight])

    useEffect(()=>{
      if (current) {
        let tab = {
          tab_id: `dialogue_${dialogueId}`,
          title: `>_${current.user}`,
          link: `/messages/${dialogueId}`
        }
        dispatch(openTab(tab));
      }
    },[current, dispatch, dialogueId])

    return isLoaded && <>
      <h2>
        <Link to={`/users/${current.userId}`} >User: {current.user}</Link>
      </h2>
      <div className="message-result" style={messageBox}>
      {!!messages && messages.length>0 && messages.map((msg)=> {
          return <div className={`${(user.id === msg.senderId)? "mymessage" : "othersMessage"}`} key={`msg_${msg.id}`}>{msg.message}</div>
        })}
      </div>
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
          dispatch(addMessage(dialogueId,message)).then(res => setMessage(""))
        }}>sendMessage()</button>
      </form>
    </>
}

