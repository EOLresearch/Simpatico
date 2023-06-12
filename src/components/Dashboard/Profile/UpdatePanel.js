import './updatepanel.css'

import { IconContext } from "react-icons";
import { AiOutlineDown, AiOutlineEllipsis } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import { useState } from "react";
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
// import { FaInfo } from 'react-icons/fa';
// import AvatarGenerator from './AvatarGenerator'

export default function UpdatePanel({ firestore, fsUser, userDetailsHandler, updateFsUser }) {
  const [anError, setAnError] = useState('')

  //View States-----------
  const [accountInfo, setAccountInfo] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(false)
  const [deceasedInfo, setDeceasedInfo] = useState(false)


  // Account  Info----------
  // const [photoURL, setPhotoURL] = useState('')
  const [email, setEmail] = useState(fsUser.email)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [displayName, setDisplayName] = useState(fsUser.displayName)

  // Personal Info----------
  const [residence, setResidence] = useState(fsUser.residence)
  const [raceEnthnicity, setRaceEnthnicity] = useState(fsUser.raceEnthnicity)
  const [bioSex, setBioSex] = useState(fsUser.bioSex)
  const [education, setEducation] = useState(fsUser.education)
  const [household, setHousehold] = useState(fsUser.household)
  const [hobbies, setHobbies] = useState(fsUser.hobbies)

  // Deceased Info----------
  const [lossDate, setLossDate] = useState(fsUser.lossDate)
  const [birthDate, setBirthDate] = useState(fsUser.birthDate)
  ///should we be able to change these below?
  const [deceased, setDeceased] = useState(fsUser.deceased)
  const [cause, setCause] = useState(fsUser.cause)
  const [deceasedAge, setDeceasedAge] = useState(fsUser.deceasedAge)

  ///we should keep a record of all these changes
  const [lossExp, setLossExp] = useState(fsUser.lossExp)

  const [consent, setConsent] = useState(false)
  const [accConsent, setAccConsent] = useState(false)



  const cancelError = () => {
    setAnError('')
  }


  const validateUpdates = (e) => {
    e.preventDefault()
    if (residence === '') {
      setResidence(fsUser.residence)
    } else if (birthDate === '') {
      setBirthDate(fsUser.birthDate)
    } else if (raceEnthnicity === '') {
      setRaceEnthnicity(fsUser.raceEnthnicity)
    } else if (bioSex === '') {
      setBioSex(fsUser.bioSex)
    } else if (education === '') {
      setEducation(fsUser.education)
    } else if (household === '') {
      setHousehold(fsUser.household)
    } else if (hobbies === '') {
      setHobbies(fsUser.hobbies)
    } else if (lossDate === '') {
      setLossDate(fsUser.lossDate)
    } else if (deceased === '') {
      setDeceased(fsUser.deceased)
    } else if (cause === '') {
      setCause(fsUser.cause)
    } else if (deceasedAge === '') {
      setDeceasedAge(fsUser.deceasedAge)
    } else if (lossExp === '') {
      setLossExp(fsUser.lossExp)
    } else if (consent === false) {
      setAnError('consent')
    } else if (consent === true) {
      setAnError('')
      updateUser(e)
    }
  }

  const validateAccountUpdates = (e) => {
    e.preventDefault()
    if (email === '') {
      setEmail(fsUser.email)
    } else if (displayName === '') {
      setDisplayName(fsUser.displayName)
    } else if (accConsent === false) {
      setAnError('consent')
    } else if (accConsent === true) {
      setAnError('')
      // updateAccount(e) 
    }
  }


  const changeHandler = (e) => {
    switch (e.target.name) {
      // case 'email':
      //   setEmail(e.target.value.trim())
      //   break
      // case 'password':
      //   setPassword(e.target.value)
      //   break
      // case 'confirmPass':
      //   setConfirmPass(e.target.value)
      //   break
      // case 'displayName':
      //   setDisplayName(e.target.value)
      //   break
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
      case 'raceEnthnicity':
        setRaceEnthnicity(e.target.value)
        break
      case 'bioSex':
        setBioSex(e.target.value)
        break
      case 'education':
        setEducation(e.target.value)
        break
      case 'household':
        setHousehold(e.target.value)
        break
      case 'hobbies':
        setHobbies(e.target.value)
        break
      case 'deceasedAge':
        setDeceasedAge(e.target.value)
        break
      default:
        console.log('default case')
    }
  }


  const updateUser = (e) => {
    const usersRef = firestore.collection('users');
    usersRef.doc(fsUser.uid).update({

      // Personal Info----------
      residence: residence,
      birthDate: birthDate,
      raceEnthnicity: raceEnthnicity,
      bioSex: bioSex,
      education: education,
      household: household,
      hobbies: hobbies,

      // Deceased Info----------
      lossDate: lossDate,
      deceased: deceased,
      cause: cause,
      deceasedAge: deceasedAge,
      lossExp: lossExp,
    })
      .then(() => {
        const newFsUser = {
          ...fsUser,
          // Personal Info----------
          residence: residence,
          birthDate: birthDate,
          raceEnthnicity: raceEnthnicity,
          bioSex: bioSex,
          education: education,
          household: household,
          hobbies: hobbies,

          // Deceased Info----------
          lossDate: lossDate,
          deceased: deceased,
          cause: cause,
          deceasedAge: deceasedAge,
          lossExp: lossExp,
        }
        updateFsUser(newFsUser)
        console.log('User updated!')
        userDetailsHandler(e, false)
      })
      .catch((error) => {
        console.error('Error updating user: ', error)
        setAnError('noupdate')
      })
  }


  const over18Bouncer = (bdayString) => {
    const today = new Date()
    const birthDate = new Date(bdayString)
    const age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    let realAge = 0

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      realAge = age - 1
      console.log(realAge)
    } else {
      realAge = age
      console.log(realAge)
    }

    if (realAge < 18) {
      return false
    } else {
      return true
    }
  }

  return (
    <IconContext.Provider value={{ className: "react-icons-updatePanel" }}>

      <div className="auth-wrapper">
        <h5>Please use this form to update your data as you wish</h5>
        <h5>Any unanswered questions will default back to your original answer from registration.</h5>
        <div className='back-btn-container'>
          <BsArrowLeft size="1.5rem" />
          <button onClick={e => userDetailsHandler(e, false)} className="back-btn">back to profile</button>
        </div>

        <div className="auth-container">
          <div className='fields-container register'>
            {/* ACCOUNT INFO----------- */}

            {accountInfo === false
              ?
              <form>
                <div onClick={e => setAccountInfo(true)} className="reg-section account-info">
                  <div className='accordion-handle'>
                    <h4>Account Info</h4>
                    <AiOutlineDown />
                  </div>
                  <h6>Edit Account information like Email, Password, and Display Name.</h6>
                </div>
              </form>
              :
              <form className='account-info-form' onSubmit={validateAccountUpdates}>
                <div className="reg-section account-info">
                  <div onClick={e => setAccountInfo(false)} className='accordion-handle'>
                    <h4>Account Info</h4>
                    <h6>Editing email and password will require email activation</h6>
                    <AiOutlineEllipsis />
                  </div>

                  {/* <div className='account-container'>
                    <p>Your Email is {fsUser.email} <button>Would y</button></p>

                  </div> */}

                  <div className='input-container'>
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
                  </div>

                  <div className='input-container'>
                    <i className="fas fa-user-alt"></i>
                    <input type="text" name="displayName" placeholder="Display Name" id="name" value={displayName} onChange={changeHandler} />
                  </div>

                  <div className='consent'>
                    <input type="checkbox" name="accConsent" id="accConsent" value={accConsent} onChange={changeHandler} ></input>
                    <div>
                      <label htmlFor="accConsent">By clicking this checkbox, I agree to share the above information and allow other users to view the information I shared.</label>
                    </div>
                  </div>
                  <div className='btn-container'>
                    <input className="btn sub-btn" type="submit" value="Submit" />
                  </div>
                </div>
              </form>
            }

            <form className='no-top-margin' onSubmit={validateUpdates}>


              {/* PERSONAL INFO----------- */}

              {personalInfo === false
                ?
                <div onClick={e => setPersonalInfo(true)} className="reg-section personal-info">
                  <div className='accordion-handle'>
                    <h4>Personal Info</h4>
                    <AiOutlineDown />
                  </div>
                  <h6>Edit Personal information like Home State, Household information, and more.</h6>
                </div>
                :
                <div className="reg-section personal-info">
                  <div onClick={e => setPersonalInfo(false)} className='accordion-handle'>

                    <h4>Personal Info</h4>
                    <AiOutlineEllipsis />
                  </div>

                  <label htmlFor='residence'>Home State</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-map"></i> */}
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

                  <label htmlFor="birthDate">Birthdate</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-calendar-alt"></i> */}
                    <input type="date" name="birthDate" id="birthDate" className="widthAdjust" placeholder="e.g. 01/01/1990" value={birthDate} onChange={changeHandler} />
                  </div>

                  <label htmlFor="raceEnthnicity">What race/ethnicity best describes you?</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-calendar-alt"></i> */}
                    <select type="text" name="raceEnthnicity" id="raceEnthnicity" placeholder="Race/Ethnicity" value={raceEnthnicity} onChange={changeHandler} >
                      <option>Prefer not to disclose</option>
                      <option>White</option>
                      <option>Black or African American</option>
                      <option>Hispanic or Latino</option>
                      <option>Asian</option>
                      <option>Native American or American Indian</option>
                      <option>Native Hawaiian or Pacific Islander</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <label htmlFor="bioSex">What is your biological sex?</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-calendar-alt"></i> */}
                    <select type="text" name="bioSex" id="bioSex" value={bioSex} onChange={changeHandler} >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Intersex</option>
                      <option>Prefer not to disclose</option>
                    </select>
                  </div>

                  <label htmlFor="education">What is your level of education?</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-calendar-alt"></i> */}
                    <select type="text" name="education" id="education" value={education} onChange={changeHandler} >
                      <option>High School</option>
                      <option>Some College</option>
                      <option>Associate's Degree</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>Doctoral Degree</option>
                      <option>Professional Degree</option>
                      <option>Prefer not to disclose</option>
                    </select>
                  </div>

                  <label htmlFor="household">What is your living situation?</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-calendar-alt"></i> */}
                    <select type="text" name="household" id="household" value={household} onChange={changeHandler} >
                      <option>Live alone</option>
                      <option>Live with partner</option>
                      <option>Live with family</option>
                      <option>Live with roommates</option>
                      <option>Prefer not to disclose</option>
                    </select>
                  </div>

                  <label htmlFor="hobbies">What are your hobbies?</label>
                  <div className='input-container'>
                    <textarea name="hobbies" id="hobbies" value={hobbies} onChange={changeHandler} ></textarea>
                  </div>

                </div>
              }

              {/* DECEASED INFO----------- */}

              {deceasedInfo === false
                ?
                <div onClick={e => setDeceasedInfo(true)} className="reg-section your-story">
                  <div className='accordion-handle'>
                    <h4>Your Story</h4>
                    <AiOutlineDown />
                  </div>
                  <h6>Edit your story surrounding your loss.</h6>
                </div>
                :
                <div className='reg-section your-story'>
                  <div onClick={e => setDeceasedInfo(false)} className='accordion-handle'>
                    <h4>Your Story</h4>
                    <AiOutlineEllipsis />
                  </div>
                  <label htmlFor="lossDate">When did you experience your loss?</label>
                  <div className='input-container'>
                    {/* <i className="fas fa-calendar-alt"></i> */}
                    <input type="date" name="lossDate" id="lossDate" className="widthAdjust" placeholder="e.g. 01/01/1990" value={lossDate} onChange={changeHandler} />
                  </div>

                  <label htmlFor="deceased">Relationship to deceased: the deceased is my...</label>
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

                  <label htmlFor="cause">How did your loss occur?</label>
                  <div className='input-container'>
                    <select name="cause" id="cause" value={cause} onChange={changeHandler} >
                      <option>Cause of death</option>
                      <option>Natural</option>
                      <option>Unnatural</option>
                    </select>
                  </div>

                  <label htmlFor="deceasedAge">How old were they?</label>
                  <div className='input-container'>
                    <input type="number" name="deceasedAge" id="deceasedAge" placeholder="age" className="widthAdjust" value={deceasedAge} onChange={changeHandler} />
                  </div>

                  <label htmlFor="lossExp">Please use this space to describe your loss experience.</label>
                  <div className='input-container'>
                    <textarea name="lossExp" id="lossExp" value={lossExp} onChange={changeHandler} ></textarea>
                  </div>
                </div>
              }

              <div className='consent'>
                <input type="checkbox" name="consent" id="consent" value={consent} onChange={changeHandler} ></input>
                <div>
                  <label htmlFor="consent">By clicking this checkbox, I agree to share the above information and allow other users to view the information I shared.</label>
                </div>
              </div>
              {(anError !== "")
                ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
              }
              <div className='btn-container'>
                <input className="btn sub-btn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )

}