import './chatmessage.css';

export default function ChatMessage({ auth, mid, message }) {
  const msgStyle = message.sentFromUid === auth.currentUser.uid ? 'sent' : 'received'

  const dateTime = new Date(message.createdAt.seconds).toLocaleString()

  if (message.sentFromUid === auth.currentUser.uid) {
    return (
      <div className={`message ${msgStyle}`}>
        <img src={message.photoURL} />
        <p>{message.body}<br /><span>{message.sentFromDisplayName} - {dateTime}</span></p>

      </div>
    )
  } else {
    return (
      <div className={`message ${msgStyle}`}>
        <p>{message.body}<br /><span>{message.sentFromDisplayName} - {dateTime} </span></p>
        <img src={message.photoURL} />
      </div>
    )
  }
}