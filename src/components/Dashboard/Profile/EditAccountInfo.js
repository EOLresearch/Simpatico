import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";


export default function EditAccountInfo({ firebase, accountInfoDisplaySwitch, userDetailsHandler, fsUser, navHandler }) {
  //Display States
  const [emailDisplay, setEmailDisplay] = useState(false)
  const [passwordDisplay, setPasswordDisplay] = useState(false)
  // --- //

  const [photoURL, setPhotoURL] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const user = firebase.auth().currentUser;



  const changeHandler = (e) => {
    switch (e.target.name) {
      case 'photoURL':
        setPhotoURL(e.target.value)
        break;
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      case 'confirmPass':
        setConfirmPass(e.target.value)
        break;
      default:
        break;
    }
  }

  const validateUpdates = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
      alert('Passwords do not match')
    } else {
      // update user info
    }
  }

  const displaySwitch = (e) => {
    if (e.target.name === 'email') {
      setEmailDisplay(!emailDisplay)
    } else if (e.target.name === 'password') {
      setPasswordDisplay(!passwordDisplay)
    }
  }

  const changeUserEmail = (e) => {

    //changing the user email in the auth system is not the same as firestore.
    //changing the user email in the auth system has consequences for the conversations and how they are logged. 
    //---->this require a change in the conversations collection to reflect the new email for that users conversations.

    // need to make sure valid email before changing. 

    e.preventDefault()
    console.log(fsUser.email)
    console.log(user.email)
    console.log(email)

    const credential = firebase.auth.EmailAuthProvider.credential(
      fsUser.email,
      password
    );

    user.reauthenticateWithCredential(credential).then(() => {
      // User re-authenticated.
      console.log('user reauthenticated')

      if (email === '') {
        console.log('no email entered')
      } else {
        const formerEmail = fsUser.email
        user.updateEmail(email).then(() => {
          console.log('auth email updated')

          const userRef = firebase.firestore().collection('users').doc(fsUser.uid)
          userRef.update({
            email: email, formerEmails: firebase.firestore.FieldValue.arrayUnion(formerEmail)
          }).then(() => {
            console.log('firestore email updated')
          }).catch((error) => {
            console.log(error)
          })
          user.sendEmailVerification().then(() => {
            console.log('email verification sent')
            navHandler("All Off")

          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
    ).catch((error) => {
      console.log(error)
    }
    )
  }


  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      <div className="auth-wrapper">
        <h5>Please use this form to update your data as you wish</h5>
        <h5>Any unanswered questions will default back to your original answer from registration.</h5>
        <div className='back-btn-container'>
          <BsArrowLeft size="1.5rem" />
          <button onClick={e => userDetailsHandler(e, false)} className="back-btn">back to profile</button>
        </div>
        <div className="auth-container">
          <div className='fields-container register'>
            <form className='account-info-form' onSubmit={validateUpdates}>
              <div className="reg-section account-info">
                <div onClick={accountInfoDisplaySwitch} className='accordion-handle'>
                  <h4>Account Info</h4>
                  <h6>Editing email and password will require email verification</h6>
                  <AiOutlineLeft />
                </div>

                <IconContext.Provider value={{ className: "react-icons-account-info" }}>
                  {emailDisplay === false ?
                    <div className='info-btn-container'>
                      <button name="email" onClick={e => displaySwitch(e)}>Change Email  <AiOutlineRight /></button>
                      <button name='password' onClick={e => displaySwitch(e)}>Change Password <AiOutlineRight /></button>
                    </div>
                    :
                    <div>
                      {/* Current email: {fsUser.email} */}
                      <div className='info-btn-container'>
                        <button name="email" onClick={e => displaySwitch(e)}>Back to Account info <AiOutlineLeft /></button>
                        <button name='password' onClick={e => displaySwitch(e)}>Change Password <AiOutlineRight /></button>

                      </div>

                      <label htmlFor="email">Enter your new email address here<br /><h6>A verification email will be sent to your email address.</h6></label>
                      <div className='input-container'>
                        <i className="fas fa-envelope"></i>
                        <input type="email" name="email" placeholder="New Email" id="email" value={email} onChange={changeHandler} />
                      </div>

                      <label htmlFor="password">Enter your current password<br /><h6>Reauthentication is required to change your email address.</h6></label>
                      <div className='input-container'>
                        <i className="fas fa-lock"></i>
                        <input type="password" name="password" placeholder="Current Password" id="password" value={password} onChange={changeHandler} />
                      </div>

                      <div className='btn-container'>
                        <h5>Upon successfull completion of this form, you will be redirected to the login screen.</h5>
                        <input className="btn sub-btn btn-account-update" type="submit" value="Submit" onClick={e => changeUserEmail(e)} />
                      </div>
                    </div>
                  }
                </IconContext.Provider>

                {/* <div className='input-container'>
                  <i className="fas fa-envelope"></i>
                  <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} />
                </div>

                <div className='input-container'>
                  <i className="fas fa-lock"></i>
                  <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} />
                </div>

                <div className='input-container'>
                  <i className="fas fa-lock"></i>
                  <input type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={changeHandler} />
                </div> */}

                {/* <div className='consent'>
                  <input type="checkbox" name="accConsent" id="accConsent" value={accConsent} onChange={changeHandler} ></input>
                  <div>
                    <label htmlFor="accConsent">By clicking this checkbox, I agree to share the above information and allow other users to view the information I shared.</label>
                  </div>
                </div> */}

                {/* <div className='btn-container'>
                  <input className="btn sub-btn" type="submit" value="Submit" />
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>

    </IconContext.Provider>
  )
}
