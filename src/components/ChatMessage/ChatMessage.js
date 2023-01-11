import './chatmessage.css';

export default function ChatMessage({ auth, mid,  message }) {
    const msgStyle = message.sentFrom === auth.currentUser.uid ? 'sent' : 'received'
  
    //rename to message
    return (
      <div className={`message ${msgStyle}`}>
        {/* <img src={message.photoURL} /> */}
         <p>{message.body}</p>
      </div>
    )
}