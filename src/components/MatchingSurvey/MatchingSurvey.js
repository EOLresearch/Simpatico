import './matchingsurvey.css';
import { useState } from "react";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function MatchingSurvey({ firebase }) {

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

  // const googleSignIn = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider)
  //     .then(result => {
  //       const userQuery = userRef.where("email", "==", result.user.email)
  //       userQuery.get().then(snapShot => {
  //         //check if user coming back from Google is in Firestore
  //         if (snapShot.docs.length > 0) {
  //           snapShot.forEach(doc => {
  //             const userData = doc.data()
  //             console.log(userData)
  //           })
  //         } else {
  //           console.log("no firestore record, one is now being created")
  //           userRef.doc(result.user.uid).set({
  //             uid: result.user.uid,
  //             email: result.user.email,
  //             displayName: result.user.displayName,
  //             photoURL: result.user.photoURL,
  //             birthDate: birthDate,
  //             lossDate: lossDate,
  //             deceased: deceased,
  //             cause: cause,
  //             // residence: residence,
  //           })
  //         }
  //       })
  //     });
  // }

  // const sendResetEmail = async (e) => {
  //   e.preventDefault()
  //   await sendPasswordResetEmail(auth, email)
  //   console.log("Password reset email sent")
  //   //TODO: this forgot password flow is nice out of the box but not awesome. Lets rework this find out a way to overwrite the default firebase behvior for this action.
  // }

  const validateNewUser = (e) => {
    console.log(e)
    e.preventDefault()
    if (birthDate === '') {
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
      // createNewUser()
    }
  }

  // const createNewUser = async () => {
  //   //TODO: EMAIL ACTIVATION FLOW - once user is signed in they should get an email to create thier account - they will not be able to send any messages until this has been completed.
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     userRef.doc(user.uid).set({
  //       uid: user.uid,
  //       email: email,
  //       displayName: displayName,
  //       birthDate: birthDate,
  //       photoURL: null,
  //       deceased: deceased,
  //       lossDate: lossDate,
  //       cause: cause,
  //       // residence: residence,
  //     })
  //   } catch (error) {
  //       const errorCode = error.code;
  //       console.log(errorCode, error.message)
  //       setAnError(errorCode)
  //     }
  // }

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

  return (
    <div className='survey-wrapper'>
      <div className='survey-header'>
        <h3>
          Simpatico helps you connect with those around who understand your unique circumstances. Please fill out the fields below for matching.
        </h3>
      </div>
      {(anError !== "")
              // this component is currently still in this document
              ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
            }
      <form onSubmit={e=>validateNewUser(e)}>
        {/* <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} />
        <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} />
        <input type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={changeHandler} /> */}
        <input type="text" name="displayName" placeholder="Display Name" id="name" value={displayName} onChange={changeHandler} />
        <label htmlFor="birthDate">Birthdate</label>
        <input type="date" name="birthDate" id="birthDate" placeholder="Birth Date" value={birthDate} onChange={changeHandler} />
      
        <label htmlFor="lossDate">When did you experience your loss?</label>
        <input type="date" name="lossDate" id="lossDate" placeholder="Loss Date" value={lossDate} onChange={changeHandler} />
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
        <select name="cause" id="cause" value={cause} onChange={changeHandler} >
          <option>Cause of death</option>
          <option>Natural</option>
          <option>Unnatural</option>
          {/* <option>Prefer not to disclose</option> */}
        </select>

        <div className='consent'>
          <input type="checkbox" name="consent" id="consent" value={consent} onChange={changeHandler} ></input>
          <label htmlFor="consent">By clicking this checkbox, I agree to share the above information and allow other users to view the information I shared.</label>
        </div>
        <input className="btn submit-form-btn" type="submit" value="Update Information"  />
      </form>
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