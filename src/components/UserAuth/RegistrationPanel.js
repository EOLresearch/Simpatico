
import { useState, useMemo, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from '../ErrorMessage/ErrorMessage'
// import AvatarGenerator from './AvatarGenerator'

export default function RegistrationPanel({ auth, usersRef, registrationDisplaySwitch, fsUser }) {
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
  const [residence, setResidence] = useState('')
  const [consent, setConsent] = useState(false)
  const [photoURL, setPhotoURL] = useState('')

  //TODO:: THOSE FLIPPIN BORDERS ON HOVER ARE DRIVING ME NUTS> THEY MOVE THE DOC FLOW

  useEffect(()=>{
    const randomNumber = Math.floor(Math.random() * (14 - 0 + 1) + 0)
    const avatarOptions = ["Bubba", "Chloe", "Bob", "Casper", "Boo", "Boots", "Abby", "Chester", "Charlie", "Cuddles", "Bandit", "Angel", "Baby", "Cookie", "Daisy"]

    const srcURL = `https://api.dicebear.com/5.x/thumbs/svg?seed=${avatarOptions[randomNumber]}`

    setPhotoURL(srcURL)
  }, [])

  const cancelError = () => {
    setAnError('')
  }

  const validateNewUser = (e) => {
    e.preventDefault()
    //there is some outdated code here, the if else statemnet is not needed without google signin.

    if (!fsUser) {
      if (email === "") {
        setAnError('auth/missing-email')
      } else if (password === '') {
        setAnError('nopass')
      } else if (password !== confirmPass) {
        setAnError('nomatchpass')
      } else if (residence === '') {
        setAnError('noresidence')
      } else if (birthDate === '') {
        setAnError('nobirth')
      } else if (lossDate === '') {
        setAnError('nolossdate')
      } else if (deceased === '') {
        setAnError('nodeceased')
      } else if (cause === '') {
        setAnError('nocause')
      } else if (lossExp === '') {
        setAnError('nolossexp')
      } else if (consent === false) {
        setAnError('consent')
      } else if (consent === true) {
        setAnError('')
        createNewUser()
      }
    } else {
      if (residence === '') {
        setAnError('noresidence')
      } else if (birthDate === '') {
        setAnError('nobirth')
      } else if (lossDate === '') {
        setAnError('nolossdate')
      } else if (deceased === '') {
        setAnError('nodeceased')
      } else if (cause === '') {
        setAnError('nocause')
      } else if (lossExp === '') {
        setAnError('nolossexp')
      } else if (consent === false) {
        setAnError('consent')
      } else if (consent === true) {
        setAnError('')
        updateUser()
      }
    }
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
      case 'residence':
        setResidence(e.target.value)
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
      case 'consent':
        setConsent(!consent)
        break
      case 'cause':
        setCause(e.target.value)
        break
      case 'lossExp':
        setLossExp(e.target.value)
        break
      default:
        console.log('default case')
    }
  }

  const createNewUser = async () => {
    //TODO: EMAIL ACTIVATION FLOW - once user is signed in they should get an email to create thier account - they will not be able to send any messages until this has been completed.
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      usersRef.doc(user.uid).set({
        uid: user.uid,
        email: email,
        displayName: displayName,
        birthDate: birthDate,
        deceased: deceased,
        lossDate: lossDate,
        cause: cause,
        residence: residence,
        lossExp: lossExp,
        photoURL: photoURL
      })
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode, error.message)
      setAnError(errorCode)
    }
  }

  const updateUser = async () => {
    try {
      usersRef.doc(fsUser.uid).set({
        email: fsUser.email,
        uid: fsUser.uid,
        displayName: displayName ? displayName : fsUser.displayName,
        birthDate: birthDate,
        photoURL: fsUser.photoURL,
        deceased: deceased,
        lossDate: lossDate,
        cause: cause,
        residence: residence,
        lossExp: lossExp,
      })
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode, error.message)
      setAnError(errorCode)
    }
  }
  const weDontNeedTheseInThisCase = fsUser ? "display-none" : "";


  return (
    <div className="auth-wrapper">
      <h3>Please complete this form</h3>
      <div className="auth-container">

        {(anError !== "")
          ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
        }

        <div className='fields-container'>
          <form onSubmit={validateNewUser}>
            <div className={weDontNeedTheseInThisCase}>
              <label htmlFor='email'>* Email Address</label>
              <div className='input-container'>
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Email" id="email" value={email} onChange={changeHandler} />
              </div>

              <label htmlFor='password'>* Password</label>
              <div className='input-container'>
                <i className="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={changeHandler} />
              </div>

              <label htmlFor='confirmpass'>* Confirm Password</label>
              <div className='input-container'>
                <i className="fas fa-lock"></i>
                <input type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={changeHandler} />
              </div>
            </div>

            <label htmlFor='displayName'>* Your Display Name</label>
            <div className='input-container'>
              <i className="fas fa-user-alt"></i>
              <input type="text" name="displayName" placeholder="Display Name" id="name" value={displayName} onChange={changeHandler} />
            </div>

            <label htmlFor='residence'>* Your Home State</label>
            <div className='input-container'>
              <i className="fas fa-map"></i>
              <select type="text" name="residence" placeholder="Home State" id="residence" value={residence} onChange={changeHandler} >
                <option>Home State</option>
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
            </div>

            <label htmlFor="birthDate">* Your Birthdate</label>
            <div className='input-container'>
              <i className="fas fa-calendar-alt"></i>
              <input type="date" name="birthDate" id="birthDate" placeholder="e.g. 01/01/1990" value={birthDate} onChange={changeHandler} />

            </div>
            <label htmlFor="lossDate">* When did you experience your loss?</label>
            <div className='input-container'>
              <i className="fas fa-calendar-alt"></i>
              <input type="date" name="lossDate" id="lossDate" placeholder="e.g. 01/01/1990" value={lossDate} onChange={changeHandler} />
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
              <input className="btn sub-btn" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
      <button onClick={registrationDisplaySwitch} className='btn btn-back'> Already joined? <strong>Login now</strong></button>
    </div>
  )
}