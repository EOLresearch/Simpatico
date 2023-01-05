import './matchlist.css';

export default function MatchList({ users, activateChatWindow }) {

  //a list of users who have been matched to the logged in user to chat with. 

  //click a user on the match list and it should open a private chat component with that user. 

  //messages should only be viewable by 2 users. sender and receiver

  //perhaps messages need to be sub collected under conversations? and then only messages in the conversation with both UUIDs will be viewable??

  return (
    <div className='match-list-container'>
      <h3>Match list</h3>
      {
        users ?
          users.map(user => {
            return (
              <div key={user.uid} onClick={()=>activateChatWindow(user)} className='match'>
                <p>{user.displayName}</p>
              </div>  
            )
          }) : null
      }
    </div>
  );

}
