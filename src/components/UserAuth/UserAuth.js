import './userauth.css';
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


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
              // console.log(userData)
            })
          } else {
            console.log("no firestore record, now being created")
            userRef.add({
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              birthDate: birthDate,
              lossDate: lossDate,
              deceased: deceased,
              simpatico: false,
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
      userRef.add({
        uid: user.uid,
        email: email,
        displayName: displayName,
        birthDate: birthDate,
        deceased: deceased,
        lossDate: lossDate,
        simpatico: false,
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
                  <button className="btn btn-sub" onClick={forgotPassDisplaySwitch}>Back to Login</button>
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
      <div className="wrapper">
        <div className="container">
          <div className="col-left">
            {(anError !== "")
              // this component is currently still in this document
              ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
            }
            <button onClick={registrationDisplaySwitch} className='btn btn-back'><i className="fa-solid fa-arrow-left"></i> Back to Login</button>
            <div className="col-left-container">
              <form>
                <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} />
                <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} />
                <input type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={changeHandler} />
                <input type="text" name="displayName" placeholder="Display Name" id="name" value={displayName} onChange={changeHandler} />
                <label htmlFor="birthDate">Birthdate</label>
                <input type="date" name="birthDate" id="birthDate" placeholder="Birth Date" value={birthDate} onChange={changeHandler} />
              </form>
            </div>
          </div>
          <div className="col-right">
            <form>
              <label htmlFor="lossDate">When did you experience your loss?</label>
              <input type="date" name="lossDate" id="lossDate" placeholder="Loss Date" value={lossDate} onChange={changeHandler} />
              <select name="deceased" id="deceased" value={deceased} onChange={changeHandler} >
                <option>The deceased is my...</option>
                <option>Partner</option>
                <option>Grandparent</option>
                <option>Parent</option>
                <option>Offspring</option>
                <option>Sibling</option>
                <option>Grand child</option>
                <option>Aunt</option>
                <option>Uncle</option>
                <option>Niece</option>
                <option>Nephew</option>
                <option>Friend</option>
                <option>Other</option>
                <option>I want to support others</option>
              </select>
              <select name="cause" id="cause" value={cause} onChange={changeHandler} >
                <option>Cause of death</option>
                <option>Natural</option>
                <option>Unnatural</option>
                {/* <option>Prefer not to disclose</option> */}
              </select>
              {/* <select name="residence" id="residence" value={residence} onChange={changeHandler} >
                <option>What state do you live in?</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select> */}
              <div className='consent'>
                <input type="checkbox" name="consent" id="consent" value={consent} onChange={changeHandler} ></input>
                <label htmlFor="consent">By clicking this checkbox, I agree to share the above information and allow other users to view the information I shared.</label>
              </div>
              <input className="btn submit-form-btn" type="submit" value="Complete Registation" onClick={validateNewUser} />
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="col-left">
          <div className="fields-container">
            <h2>Login</h2>
            {(anError !== "")
              // this component is currently still in this document
              ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
            }
            <form onSubmit={onSubmitReturningUser}>
              <input type="email" placeholder="Email" value={email} onChange={changeHandler} name="useremail" required />
              <input type="password" placeholder="Password" value={password} onChange={changeHandler} name="userpass" required />
              <input className="btn" type="submit" value="Sign In" />
              <div className='sub-container'>
                <button className='btn btn-sub' onClick={registrationDisplaySwitch}>New User?</button>
                <button className="btn btn-sub" onClick={forgotPassDisplaySwitch}>Forgot Password?</button>
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


function ErrorMessage({ error, cancelError }) {
  //can refactor this to using lookupobj with {lookUpOBJ[error]} in the JSX. but not needed now

  const errorMaker = (err) => {
    switch (err) {
      case 'auth/user-not-found':
        return "User not found."
      case "auth/internal-error":
        return "Problem with email or password"
      case "auth/missing-email":
        return "Email is missing"
      case "auth/invalid-email":
        return "Email is invalid"
      case "auth/email-already-in-use":
        return "Email is already in use"
      case "auth/weak-password":
        return "Password should be at least 6 characters"
      case 'nopass':
        return "Please enter a password"
      case 'nomatchpass':
        return "Passwords do not match"
      case 'nobirth':
        return "Please enter your birthday"
      case 'nolossdate':
        return "Please enter a date of loss"
      case 'nodeceased':
        return "Please enter kinship to the deceased"
      case 'nocause':
        return "Please enter cause of death"
      case 'noresidence':
        return "Please enter your home state"
      case 'consent':
        return "You must consent to share your information"
      default:
        console.log('switch default' + error)
    }
  }
  return (
    <div key={error} className='error-message' onClick={cancelError}>
      <p>{errorMaker(error)}</p><div className='x-btn'>✕</div>
    </div>
  )
}