import './userauth.css';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserAuth({ currentUser, firebase }) {
  const [regPanel, setRegPanel] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [deceased, setDeceased] = useState('')
  const [gender, SetGender] = useState('')
  const [residence, setResidence] = useState('')
  const [consent, setConsent] = useState(false)

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const displayRegistration = (e) => {
    e.preventDefault()
    setRegPanel(true)
  }
  //TODO: something about the firestore rules are prohibiting the storing of this user data. **IT ALSO NEEDS THE USER ID YALL
  // Uncaught (in promise) FirebaseError: Missing or insufficient permissions.

  
  const validateNewUser = async(e) => {
    e.preventDefault()
    if (consent === false) return
    // console.log(email, password, confirmPass, displayName, birthYear, deceased, gender, residence, consent)

    const userRef = firestore.collection('users');
    const auth = getAuth();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid)
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
      alert(error.message)
    }
  }

  const returningUser = (e) => {
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)

      });
  }

  const backToLogin = (e) => {
    setRegPanel(false)
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
    }
  }

  if (regPanel === true) {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="col-left">
            <button onClick={backToLogin} className='btn btn-back'><i className="fa-solid fa-arrow-left"></i> Back to Login</button>
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
                <option>Homie</option>
                <option>Father</option>
                <option>Cousin</option>
                <option>Prefer not to disclose</option>
              </select>
              <select name="gender" id="gender" value={gender} onChange={changeHandler} required>
                <option>Your sex/gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to disclose</option>
              </select>
              <select name="residence" id="residence" value={residence} onChange={changeHandler} required>
                <option>Where do you live in the us?</option>
                <option>every </option>
                <option>single</option>
                <option>state</option>
                <option>alphabetized</option>
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
                <button className='btn btn-sub' onClick={displayRegistration}>New User?</button>
                <button className="btn btn-sub">Forgot Password?</button>
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