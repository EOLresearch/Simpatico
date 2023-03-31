export default function Convo({ firebase , convo, chatHandler }) {

  const auth = firebase.auth();
  const { uid } = auth.currentUser;

  const theOtherPerson = uid === convo.userData.sender.uid ? convo.userData.receiver : convo.userData.sender

  return (
    <div className='convo-container' onClick={e=>chatHandler(e, convo.docID)}>
      <div className='convo' >
        <img alt="avatar" src={theOtherPerson.photoURL} ></img>
        <p data-identifier="openChat">{theOtherPerson.displayName}</p>
      </div>
    </div>
  )
}