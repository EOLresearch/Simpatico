import { auth } from '../../../firebase-config';

export default function Convo({convo, selectedDocID, chatHandler }) {

  const { uid } = auth.currentUser;

  const theOtherPerson = uid === convo.userData.sender.uid ? convo.userData.receiver : convo.userData.sender

  const selected = selectedDocID === convo.docID ? "selected" : ' '

  return (
    <div className={'convo-container ' + selected} onClick={e=>chatHandler(e, convo.docID)}>
      <div className='convo' >
        <img alt="avatar" src={theOtherPerson.photoURL} ></img>
        <p data-identifier="openChat">{theOtherPerson.displayName}</p>
      </div>
    </div>
  )
}