import React, {useState, useEffect,  } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {  getMessages, addMessage } from '../../store/message';
import './message.css'



const Message = () => {
    const [message, setMessage] = useState("");
    const { dialogueId }  = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      // setInterval(() => {
        dispatch(getMessages(dialogueId))
      // }, 30000)

    }, [dispatch])
    // const {message} = useSelector(state => state.message)

    const user = useSelector(state => {
      return state.session.user
    })

    const fullStore = useSelector(state => {
      return state.messages
    })
    // const handleSubmit = (e) => {
    //   e.preventDefault()
    //   dispatch(postMessages(message, dialogueId))
    // }

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
       { fullStore.map((msg)=> {

          return <div className={`${(user.id === msg.senderId)? "mymessage" : "othersMessage"}`}>{msg.message}</div>

        })}
      </div>
    </div>
    )
}

export default Message;
