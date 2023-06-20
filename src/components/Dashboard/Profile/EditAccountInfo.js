import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
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
      setPasswordDisplay(false)
      setEmailDisplay(!emailDisplay)
    } else if (e.target.name === 'password') {
      setEmailDisplay(false)
      setPasswordDisplay(!passwordDisplay)
    }
  }

  const changeUserEmail = (e) => {

    // ***************** ----> this require a change in the conversations collection to reflect the new email for that users conversations.

    // ***************** -------> need to make sure valid email before changing. 

    // ***************** -------> need a warning message before changing. 



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

  const passwordReset = (e) => {
    e.preventDefault()
    if (email === '') {
      console.log('no email entered')

    } else {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        console.log('password reset email sent')
        // navHandler("All Off")
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
          <form className='account-info-form' onSubmit={validateUpdates}>
            <div className="reg-section account-info">
              <div onClick={accountInfoDisplaySwitch} className='accordion-handle'>
                <h4>Account Info</h4>
                <AiOutlineUp />
              </div>
                <h6>Editing email and password will require email verification</h6>

              <IconContext.Provider value={{ className: "react-icons-account-info" }}>
                <div className='info-btn-container'>
                  <button name="email" onClick={e => displaySwitch(e)}>Change Email  {emailDisplay === false ? <AiOutlineDown /> : <AiOutlineUp />}    </button>
                  <button name='password' onClick={e => displaySwitch(e)}>Change Password {passwordDisplay === false ? <AiOutlineDown /> : <AiOutlineUp />} </button>
                </div>

                {emailDisplay === true ?
                  <div>
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
                  : null}

                {passwordDisplay === true ?
                  <div>
                    <label htmlFor="email">Password reset<br /><h6>A password reset email will be sent to your email address.</h6></label>
                    <div className='input-container'>
                      <i className="fas fa-envelope"></i>
                      <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} />
                    </div>
                    <div className='input-container'>
                      <i className="fas fa-lock"></i>
                      <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} />

                    </div>
                    <div className='btn-container'>
                      <input className="btn sub-btn btn-account-update" type="submit" value="Submit" onClick={e => passwordReset(e)} />
                    </div>
                  </div>
                  : null}
              </IconContext.Provider>
            </div>
          </form>


    </IconContext.Provider>
  )
}
