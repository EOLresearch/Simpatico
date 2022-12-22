import './userauth.css';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
// import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserAuth({ firebase, currentUser }) {
  const [regPanel, setRegPanel] = useState(false)
  const [resetPass, setResetPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [deceased, setDeceased] = useState('')
  const [gender, SetGender] = useState('')
  const [residence, setResidence] = useState('')
  const [consent, setConsent] = useState(false)


  const auth = getAuth();
  const firestore = firebase.firestore();

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);

  }
  //TODO: Currently, This google sign in DOES NOT create a user record in firestore.
  //TODO: get past the blockers on FACEBOOK AUTH 
  //TODO: MEANINGFUL ERRORS/FORM VALIDATION


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

  const sendResetEmail = async (e) => {
    e.preventDefault()
    await sendPasswordResetEmail(auth, email)
    console.log("Password reset email sent")
  }
  //TODO: this forgot password flow is nice out of the box but not awesome. Lets rework this find out a way to overwrite the default firebase behvior for this action.

  const validateNewUser = async (e) => {
    //TODO: EMAIL ACTIVATION FLOW - once user is signed in they should get an email to validate thier account - they should have a logo indicating they have not done this until it is done.
    e.preventDefault()
    if (consent === false) return
    const userRef = firestore.collection('users');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      userRef.add({
        uid: user.uid,
        email: email,
        displayName: displayName,
        birthDate: birthYear,
        deceased: deceased,
        gender: gender,
        residence: residence,
      })
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }
  }

  const returningUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
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
      case 'birthYear':
        setBirthYear(e.target.value)
        break
      case 'deceased':
        setDeceased(e.target.value)
        break
      case 'gender':
        SetGender(e.target.value)
        break
      case 'residence':
        setResidence(e.target.value)
        break
      case 'consent':
        setConsent(e.target.checked)
        break
      case 'useremail':
        setEmail(e.target.value)
        break
      case 'userpass':
        setPassword(e.target.value)
        break
      default:
        console.log('default case')
    }
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
            <button onClick={registrationDisplaySwitch} className='btn btn-back'><i className="fa-solid fa-arrow-left"></i> Back to Login</button>
            <div className="col-left-container">
              <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} required />
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={changeHandler} required />
                <label htmlFor="name">Display Name:</label>
                <input type="text" name="displayName" placeholder="Display Name" id="name" value={displayName} onChange={changeHandler} required />
                <label htmlFor="birthYear">Birth Year</label>
                <input type="number" name="birthYear" id="birthYear" placeholder="Birth Year - YYYY" value={birthYear} onChange={changeHandler} />
              </form>
            </div>
          </div>
          <div className="col-right">
            <form>
              <select name="deceased" id="deceased" value={deceased} onChange={changeHandler} required>
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
              <select name="gender" id="gender" value={gender} onChange={changeHandler} required>
                <option>Your sex/gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to disclose</option>
              </select>
              <select name="residence" id="residence" value={residence} onChange={changeHandler} required>
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
              </select>
              <div className='consent'>
                <input type="checkbox" name="consent" id="consent" value={consent} onChange={changeHandler} required></input>
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
            <form onSubmit={returningUser}>
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