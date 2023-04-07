import './chatmessage.css';

export default function ChatMessage({ auth, mid, message }) {
  const msgStyle = message.sentFromUid === auth.currentUser.uid ? 'sent' : 'received'


  function subScript(){
    if (message.createdAt === null) {
      return `${message.sentFromDisplayName} - --`
    } else {
      const dateTime = new Date(message.createdAt.seconds * 1000).toLocaleString()
      return `${message.sentFromDisplayName} - ${dateTime}`
    }
  }

  if (message.sentFromUid === auth.currentUser.uid) {
    return (
      <div className={`message ${msgStyle}`}>
        <div className='msg-inner-container'>
          <img src={message.photoURL} alt="user avatar"/>
          <p>{message.body}<br /><span>{subScript()} </span></p>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`message ${msgStyle}`}>
        <div className='msg-inner-container'>
          <p>{message.body}<br /><span>{subScript()} </span></p>
          <img src={message.photoURL} alt="user avatar"/>
        </div>
      </div>
    )
  }
}