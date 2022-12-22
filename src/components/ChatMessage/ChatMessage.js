import './chatmessage.css';

export default function ChatMessage({ auth, mid, message }) {

    const msgStyle = message.uid === auth.currentUser.uid ? 'sent' : 'received'
  
    return (
      <div key={mid} className={`message ${msgStyle}`}>
        {/* <img src={message.photoURL} /> */}
        <p key={mid}>{message.body}</p>
      </div>
    )
}