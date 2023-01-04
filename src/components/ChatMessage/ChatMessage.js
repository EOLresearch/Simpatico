import './chatmessage.css';

export default function ChatMessage({ auth, mid,  message }) {
    const msgStyle = message.uid === auth.currentUser.uid ? 'sent' : 'received'
  
    return (
      <div className={`message ${msgStyle}`}>
        {/* <img src={message.photoURL} /> */}
         <p>{message.body}</p>
      </div>
    )
}