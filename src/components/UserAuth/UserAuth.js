import './userauth.css';
import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
// import { FaGoogle } from 'react-icons/fa';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import RegistrationPanel from './RegistrationPanel';

export default function UserAuth({ user, firebase }) {
  const [regPanel, setRegPanel] = useState(false)
  const [resetPass, setResetPass] = useState(false)
  const [anError, setAnError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');

  //googlesignin is creating toooooo many issues right now. moving on to MVP before coming back to google/facebook signin
  // lets not call GoogleAuthProvider() until we have the information we need, that elliminates the issues here for the most part, but thats after MVP now. that AND FACEBOOK

  // const googleSignIn = () => {

  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider)
  //     .then(result => {
  //       const userQuery = usersRef.where("email", "==", result.user.email)
  //       userQuery.get().then(snapShot => {
  //         //check if user coming back from Google is in Firestore
  //         if (snapShot.docs.length > 0) {
  //           snapShot.forEach(doc => {
  //             const userData = doc.data()
  //             console.log(userData)
  //           })
  //         } else {
  //           console.log("no firestore record, one is now being created")
  //           usersRef.doc(result.user.uid).set({
  //             uid: result.user.uid,
  //             email: result.user.email,
  //             displayName: result.user.displayName,
  //             photoURL: result.user.photoURL,
  //             birthDate: '',
  //             lossDate: '',
  //             deceased: '',
  //             cause: '',
  //             residence: '',
  //             lossExp: '',
  //           })
  //         }
  //       })
  //     });
  // }

  const sendResetEmail = async (e) => {
    e.preventDefault()
    await sendPasswordResetEmail(auth, email)
    .then(() => {
      // Email sent.
      console.log("Password reset email sent")
      setEmail('Password reset email sent, check your email.')
    })
    .catch((error) => {
      // An error occurred
      console.log(error)
      setAnError(error)
    });
  }

  const onSubmitReturningUser = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        setAnError(errorCode)
      });
  }

  const changeHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        console.log('default case')
    }
  }

  const cancelError = () => {
    setAnError('')
  }

  const registrationDisplaySwitch = (e) => {
    e.preventDefault()
    setResetPass(false)
    setRegPanel(!regPanel)
  }

  const forgotPassDisplaySwitch = (e) => {
    e.preventDefault()
    setRegPanel(false)
    setResetPass(!resetPass)
  }
  const sendVerificationEmail = () => {
    console.log('verification email sent')
    auth.currentUser.sendEmailVerification()
  }

  if (resetPass === true) {
    return (
      <form  className="forgotPassForm" onSubmit={sendResetEmail}>
        {(anError !== "")
          ? <ErrorMessage error={anError} cancelError={cancelError} /> : null}
        <p>Please submit the email address associated with your account</p>
        <input type="email" placeholder="Email" value={email} onChange={changeHandler} name="email" />
        <div className='btn-container'>
          <button  type="submit" value="Send Password Reset" >Send Password Reset</button>
          <button onClick={registrationDisplaySwitch}>New User?</button>
          <button onClick={forgotPassDisplaySwitch} ><i className="fa-solid fa-arrow-left"></i> Back to Login</button>
        </div>
      </form>
    )
  }

  if (regPanel === true) {
    return <RegistrationPanel auth={auth} usersRef={usersRef} fsUser={null} registrationDisplaySwitch={registrationDisplaySwitch} />
  }

  return (
    <div className="auth-wrapper">
      <div className='callout-container'>
        <div className='callout auth-callout'></div>
        <div className='callout auth-callout'></div>
        <div className='callout auth-callout'></div>
      </div>
      {(anError !== "") ? <ErrorMessage error={anError} cancelError={cancelError} /> : null}
      <div className="auth-container">
        <div className="fields-container">
          <h4>Log in to your profile</h4>

          {user ? user.emailVerified === false ?
            <div onClick={() => auth.signOut()} className='modal-bg'>
              <div className='user-verify'>
                <p>Please check your email to verify your account</p>
                <button onClick={sendVerificationEmail}>Resend Verification Email</button>
                <button onClick={() => auth.signOut()}>close</button>
              </div>
            </div> : null : null}

          <form onSubmit={onSubmitReturningUser}>
            <label htmlFor='email'>* Email Address</label>
            <div className='input-container'>
              <i className="fas fa-envelope"></i>
              <input id="email" type="email" placeholder="Your Email Address" value={email} onChange={changeHandler} name="email" required />
            </div>

            <label htmlFor='password'>* Password</label>
            <div className='input-container'>
              <i className="fas fa-lock"></i>
              <input id="password" type="password" placeholder="Your Password" value={password} onChange={changeHandler} name="password" required />
            </div>

            <div className='btn-container'>
              <button className='sub-btn' type="submit">Login</button>
              {/* <button className="btn-go" onClick={googleSignIn}><FaGoogle size="2rem" /> <span>Sign in with Google</span></button> */}
              <button className='forgot-pass-btn' onClick={forgotPassDisplaySwitch}>Forgot Password?</button>
              <button onClick={registrationDisplaySwitch}>Not a member? <strong>Join now</strong></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
