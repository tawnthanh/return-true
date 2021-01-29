import React, {useState, useEffect,  } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {  getMessages } from '../../store/message';


const Message = () => {
    const [message, setMessage] = useState("");
    const { dialogueId }  = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getMessages(dialogueId))
    }, [dispatch])
    // const {message} = useSelector(state => state.message)

    console.log(message)

    const fullStore = useSelector(state => {
      return state.messages
    })
    // const handleSubmit = (e) => {
    //   e.preventDefault()
    //   dispatch(postMessages(message, dialogueId))
    // }

    return (
      <div className="messagebox">
        <form >
          <input
              name="message"
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => {
            // dispatch(postMessages(message, dialogueId))
          }}>Send Message</button>

          <button onClick={() => {
            // dispatch(removeMessages())
          }}>Delete Message</button>
        </form>


      <div className="message-result">
          {message}
      </div>
    </div>
    )
}

export default Message;
