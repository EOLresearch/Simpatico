import './userauth.css';
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FaGoogle } from 'react-icons/fa';
import ErrorMessage from '../ErrorMessage'

// ******problems with any email being allowed to sign up, thats a spam bots dream******************

export default function UserAuth({ firebase }) {
  const [regPanel, setRegPanel] = useState(false)
  const [resetPass, setResetPass] = useState(false)

  const [anError, setAnError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [lossDate, setLossDate] = useState('')
  const [deceased, setDeceased] = useState('')
  const [cause, setCause] = useState('')
  const [lossExp, setLossExp] = useState('')

  // const [residence, setResidence] = useState('')
  const [consent, setConsent] = useState(false)

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const userRef = firestore.collection('users');

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const userQuery = userRef.where("email", "==", result.user.email)
        userQuery.get().then(snapShot => {
          //check if user coming back from Google is in Firestore
          if (snapShot.docs.length > 0) {
            snapShot.forEach(doc => {
              const userData = doc.data()
              console.log(userData)
            })
          } else {
            console.log("no firestore record, one is now being created")
            userRef.doc(result.user.uid).set({
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              birthDate: birthDate,
              lossDate: lossDate,
              deceased: deceased,
              cause: cause,
              // residence: residence,
            })
          }
        })
      });
  }

  const sendResetEmail = async (e) => {
    e.preventDefault()
    await sendPasswordResetEmail(auth, email)
    console.log("Password reset email sent")
    //TODO: this forgot password flow is nice out of the box but not awesome. Lets rework this find out a way to overwrite the default firebase behvior for this action.
  }

  const validateNewUser = (e) => {
    e.preventDefault()
    if (email === "") {
      setAnError('auth/missing-email')
    } else if (password === '') {
      setAnError('nopass')
    } else if (password !== confirmPass) {
      setAnError('nomatchpass')
    } else if (birthDate === '') {
      setAnError('nobirth')
    } else if (lossDate === '') {
      setAnError('nolossdate')
    } else if (deceased === '') {
      setAnError('nodeceased')
    } else if (cause === '') {
      setAnError('nocause')
    }

    // else if (residence === '') {
    //   setAnError('noresidence')
    // } 

    else if (consent === false) {
      setAnError('consent')
    } else if (consent === true) {
      setAnError('')
      createNewUser()
    }
  }

  const createNewUser = async () => {
    //TODO: EMAIL ACTIVATION FLOW - once user is signed in they should get an email to create thier account - they will not be able to send any messages until this has been completed.
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      userRef.doc(user.uid).set({
        uid: user.uid,
        email: email,
        displayName: displayName,
        birthDate: birthDate,
        photoURL: null,
        deceased: deceased,
        lossDate: lossDate,
        cause: cause,
        // residence: residence,
      })
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode, error.message)
      setAnError(errorCode)
    }
  }

  const onSubmitReturningUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // ...
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
      case 'confirmPass':
        setConfirmPass(e.target.value)
        break
      case 'displayName':
        setDisplayName(e.target.value)
        break
      case 'birthDate':
        setBirthDate(e.target.value)
        break
      case 'lossDate':
        setLossDate(e.target.value)
        break
      case 'deceased':
        setDeceased(e.target.value)
        break
      // case 'residence':
      //   setResidence(e.target.value)
      //   break
      case 'consent':
        setConsent(!consent)
        break
      case 'useremail':
        setEmail(e.target.value)
        break
      case 'userpass':
        setPassword(e.target.value)
        break
      case 'cause':
        setCause(e.target.value)
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

  if (resetPass === true) {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="col-left">
            <div className="fields-container">
              <h2>Login</h2>
              <form onSubmit={sendResetEmail}>
                <p>Please submit the email address associated with your account</p>
                <input type="email" placeholder="Email" value={email} onChange={changeHandler} name="useremail" required />
                <input className="btn" type="submit" value="Send Password Reset" />
                <div className='sub-container'>
                  <button className='btn btn-sub' onClick={registrationDisplaySwitch}>New User?</button>
                  <button onClick={forgotPassDisplaySwitch} className='btn btn-back'><i className="fa-solid fa-arrow-left"></i> Back to Login</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-right">
            <div className="login-with-container">
              <h2>Login with</h2>
              <button className="btn btn-go" onClick={googleSignIn}>Google</button>
              <button className="btn btn-fb">Facebook</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (regPanel === true) {
    return (
      <div className="auth-wrapper">
        <h3>Register</h3>
        <div className="auth-container">
          {(anError !== "")
            // this component is currently still in this document
            ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
          }
          <div className='fields-container'>
            <form>
              <label htmlFor='email'>* Email Address</label>
              <div className='input-container'>
                <i class="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} />
              </div>

              <label htmlFor='password'>* Password</label>
              <div className='input-container'>
                <i class="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} />
              </div>

              <label htmlFor='confirmpass'>* Confirm Password</label>
              <div className='input-container'>
                <i class="fas fa-lock"></i>
                <input type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={changeHandler} />
              </div>

                <label htmlFor='displayName'>* Your Display Name</label>
              <div className='input-container'>
                <i class="fas fa-user-alt"></i>
                <input type="text" name="displayName" placeholder="Display Name" id="name" value={displayName} onChange={changeHandler} />

              </div>

              <label htmlFor="birthDate">* Your Birthdate</label>
              <div className='input-container'>
                <i class="fas fa-calendar-alt"></i>
                <input type="text" name="birthDate" id="birthDate" placeholder="e.g. 01/01/1990" value={birthDate} onChange={changeHandler} />

              </div>
              <label htmlFor="lossDate">* When did you experience your loss?</label>
              <div className='input-container'>
                <i class="fas fa-calendar-alt"></i>
                <input type="text" name="lossDate" id="lossDate" placeholder="e.g. 01/01/1990" value={lossDate} onChange={changeHandler} />
              </div>

              <label htmlFor="deceased">* Relationship to deceased: the deceased is my...</label>
              <div className='input-container'>
                <select name="deceased" id="deceased" value={deceased} onChange={changeHandler} >
                  <option>The deceased is my...</option>
                  <option>Partner</option>
                  <option>Grandparent</option>
                  <option>Parent</option>
                  <option>Offspring</option>
                  <option>Sibling</option>
                  <option>Cousin</option>
                  <option>Grandchild</option>
                  <option>Aunt</option>
                  <option>Uncle</option>
                  <option>Niece</option>
                  <option>Nephew</option>
                  <option>Friend</option>
                  <option>Other</option>
                  <option>I want to support others</option>
                </select>
              </div>

              <label htmlFor="cause">* How did you loss occur?</label>
              <div className='input-container'>
                <select name="cause" id="cause" value={cause} onChange={changeHandler} >
                  <option>Cause of death</option>
                  <option>Natural</option>
                  <option>Unnatural</option>
                  {/* <option>Prefer not to disclose</option> */}
                </select>
              </div>

              <label htmlFor="lossExp">* Please use this space to describe your loss experience.</label>
              <div className='input-container'>
                <textarea name="lossExp" id="lossExp" value={lossExp} onChange={changeHandler} ></textarea>
              </div>

              <div className='consent'>
                <input type="checkbox" name="consent" id="consent" value={consent} onChange={changeHandler} ></input>
                <div>
                  <label htmlFor="consent">By clicking this checkbox, I agree to share the above information and allow other users to view the information I shared.</label>
                </div>
              </div>
              <div className='btn-container'>

              <input className="sub-btn" type="submit" value="Submit" onClick={validateNewUser} />
              </div>
            </form>
          </div>
        </div>
        

            <button onClick={registrationDisplaySwitch} className='btn btn-back'> Already joined? <strong>Login now</strong></button>

      </div>
    )
  }

  return (
    <div className="auth-wrapper">
      {/* <div className='auth-header'>
        <h1>SIMPATICO</h1>
        <p>Connect with people who have experienced similar types of loss</p>
      </div> */}
      <div className='callout-container'>
        <div className='callout auth-callout'></div>
        <div className='callout auth-callout'></div>
        <div className='callout auth-callout'></div>
      </div>

      <div className="auth-container">
        <div className="fields-container">
          <h4>Login to your profile</h4>
          {(anError !== "")
            // this component is currently still in this document
            ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
          }
          <form onSubmit={onSubmitReturningUser}>
            <label htmlFor='email'>* Email Address</label>
            <div className='input-container'>
              <i className="fas fa-envelope"></i>
              <input id="email" type="email" placeholder="Your Email Address" value={email} onChange={changeHandler} name="useremail" required />
            </div>
            <label htmlFor='password'>* Password</label>
            <div className='input-container'>
              <i className="fas fa-lock"></i>
              <input id="password" type="password" placeholder="Your Password" value={password} onChange={changeHandler} name="userpass" required />
              <i className="fas fa-eye-slash"></i>
              {/* TODO: functional password chracter reveal in place of this static logo */}
            </div>

            <div className='btn-container'>
              <button className='sub-btn' type="submit">Login</button>
              <button className='forgot-pass-btn' onClick={forgotPassDisplaySwitch}>Forgot Password</button>
              <p>
                <button onClick={registrationDisplaySwitch}>Not a member? <strong>Join now</strong></button>
              </p>
              <br />or use an existing account<button className="btn-go" onClick={googleSignIn}><FaGoogle size="2rem" /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
