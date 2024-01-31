import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import './userdetailsform.css';

import Section from './Section';
import InputField from './InputField';
import SelectField from './SelectField';

import { reAuth, updateUserEmail, sendResetPasswordEmail, updateUserDetails } from '../../../helpers/firebasehelpers-legacy';

import { auth, firestore } from '../../../firebase-config';

import { US_STATES, RACE_OPTIONS, ETHNICITY_OPTIONS, BIOLOGICAL_SEX_OPTIONS, EDUCATION_OPTIONS, HOUSEHOLD_OPTIONS, KINSHIP_OPTIONS, CAUSE_OPTIONS } from "../../../helpers/optionsArrays";

const UserDetailsForm = ({ handleToggle, fsUser, updateFsUser }) => {
  const [anError, setAnError] = useState('')
  const [consent, setConsent] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)
  const [accountInfoDisplayToggle, setAccountInfoDisplayToggle] = useState(false)
  const [changeEmailDisplay, setChangeEmailDisplay] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [changeConfirmation, setChangeConfirmation] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [userDetails, setUserDetails] = useState({
    photoURL: '',
    email: '',
    password: '',
    confirmPass: '',
    displayName: '',
    residence: '',
    lossDate: '',
    race: '',
    ethnicity: '',
    bioSex: '',
    education: '',
    household: '',
    hobbies: '',
    birthDate: '',
    kinship: '',
    cause: '',
    deceasedAge: '',
    lossExp: '',
    admin:true,
  });

  useEffect(() => {
    const avatarOptions = ["Bubba", "Chloe", "Bob", "Casper", "Boo", "Boots", "Abby", "Chester", "Charlie", "Cuddles", "Bandit", "Angel", "Baby", "Cookie", "Daisy"];

    const getRandomAvatarURL = (options) => {
      const randomNumber = Math.floor(Math.random() * options.length);
      const seedName = options[randomNumber];
      return `https://api.dicebear.com/5.x/thumbs/svg?seed=${seedName}`;
    }

    setUserDetails(prevDetails => ({ ...prevDetails, photoURL: getRandomAvatarURL(avatarOptions) }));
  }, []);

  useEffect(() => {
    if (fsUser) {
      setIsUpdateForm(true)
      setUserDetails(prevDetails => ({ ...prevDetails, ...fsUser }));
    }
  }, [fsUser]);

  const cancelError = () => {
    setAnError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validations = []

    if (!isUpdateForm) {
      validations.push(
        { condition: !userDetails.email.trim(), error: 'auth/missing-email' },
        { condition: !userDetails.password, error: 'nopass' },
        { condition: userDetails.password !== userDetails.confirmPass, error: 'nomatchpass' }
      );
    }

    validations.push(
      { condition: !userDetails.residence, error: 'noresidence' },
      { condition: !userDetails.birthDate, error: 'nobirth' },
      { condition: !over18Bouncer(userDetails.birthDate), error: 'under18' },
      { condition: !userDetails.race, error: 'norace' },
      { condition: !userDetails.ethnicity, error: 'noethnicity' },
      { condition: !userDetails.bioSex, error: 'nobiosex' },
      { condition: !userDetails.education, error: 'noeducation' },
      { condition: !userDetails.household, error: 'nohousehold' },
      { condition: !userDetails.lossDate, error: 'nolossdate' },
      { condition: !userDetails.kinship, error: 'nokinship' },
      { condition: !userDetails.cause, error: 'nocause' },
      { condition: !userDetails.deceasedAge, error: 'nodeceasedage' },
      { condition: !userDetails.lossExp, error: 'nolossexp' },
    );

    for (const validation of validations) {
      if (validation.condition) {
        setAnError(validation.error);
        return;
      }
    }

    if (!consent) {
      setAnError('noconsent');
      return;
    }

    if (isUpdateForm) {
      handleToggle(e);

      delete userDetails.password;
      delete userDetails.confirmPass;
      delete userDetails.email;

      updateUserDetails(fsUser.uid, userDetails);
      updateFsUser(userDetails);
      alert("Your details have been updated!")
      return;
    } else {
      createNewUser(e);
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'changeConfirmation') {
      setChangeConfirmation(!changeConfirmation)
    }
    if (name === 'consent') {
      setConsent(!consent)
    }
    if (name === 'newEmail') {
      setNewEmail(value)
    }
    setUserDetails(prevState => ({ ...prevState, [name]: value }));
  }

  const createNewUser = async (e) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const user = userCredential.user;

      const newUser = {
        uid: user.uid,
        ...userDetails,
        simpaticoMatch: '',
      };

      delete newUser.password;
      delete newUser.confirmPass;

      const usersRef = firestore.collection('users');
      await usersRef.doc(user.uid).set(newUser);
      await auth.currentUser.sendEmailVerification();
      handleToggle(e);
    } catch (error) {
      console.log(error.code, error.message);
      setAnError(error.code);
    }
  }

  const over18Bouncer = (bdayString) => {
    const today = new Date()
    const birthDate = new Date(bdayString)
    const age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    let realAge = 0

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      realAge = age - 1
    } else {
      realAge = age
    }

    if (realAge < 18) {
      return false
    } else {
      return true
    }
  }

  const handlePasswordReset = () => {
    sendResetPasswordEmail(userDetails.email)
    setResetEmailSent(true);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleUpdateUserEmail = () => {
    setShowConfirmMessage(true)
    if (validateEmail(newEmail)) {
      // Continue with the email update
      if (changeConfirmation) {
        updateUserEmail(userDetails.uid, newEmail)
        setShowConfirmMessage(false)
        setChangeEmailDisplay(false)
        auth.signOut()
      } else {
        setAnError("noemailchange")
      }
    } else {
      console.error("Invalid email format");
      setAnError("Invalid email format");
      throw new Error("Invalid email format");
    }
  }

  const defaultForm = (
    <>
      <InputField label="" type="email" name="email" placeholder="Email" id="email" value={userDetails.email} iconClass="fas fa-envelope" onChange={changeHandler} />
      <InputField label="" type="password" name="password" placeholder="Password" id="password" value={userDetails.password} iconClass="fas fa-lock" onChange={changeHandler} />
      <InputField label="" type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={userDetails.confirmPass} iconClass="fas fa-lock" onChange={changeHandler} />
      <InputField label="" type="text" name="displayName" placeholder="Display Name" id="name" value={userDetails.displayName} iconClass="fas fa-user-alt" onChange={changeHandler} />
    </>
  );

  const accountButtons = (
    <div className="account-btns">
      <button type="button" onClick={e => setChangeEmailDisplay(true)}>Change Email</button>
      <button type="button" onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );

  const emailChange = (
    <div className="change-email-input-container">
      <h5>Enter your new email address below.</h5>
      <InputField label="" type="email" name="newEmail" placeholder="New Email" id="newEmail" value={newEmail} iconClass="fas fa-envelope" onChange={changeHandler} />
      {showConfirmMessage &&
        <div className='confirm'>
          <input type="checkbox" name="changeConfirmation" id="changeConfirmation" value={changeConfirmation} onChange={changeHandler}></input>
          <label htmlFor="changeConfirmation">Change account email address used for login from {userDetails.email} to {newEmail} ?</label>
        </div>}
      <h5>Changing your login email will log you off and send the new address a verifcation email.</h5>
      {(anError !== "")
        ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
      }
      <button type="button" onClick={handleUpdateUserEmail} className='account-login-btn'>{showConfirmMessage ? "Update Email" : "Confirm"}</button>
      <button type="button" onClick={e => setChangeEmailDisplay(false)} className='account-login-btn'>Back</button>
    </div>
  );

  const loginToChangeDetails = (
    <>
      <h5>Please confirm your login to change account details.</h5>
      <InputField label="" type="email" name="email" placeholder="Email" id="email" value={userDetails.email} iconClass="fas fa-envelope" onChange={changeHandler} />
      <InputField label="" type="password" name="password" placeholder="Password" id="password" value={userDetails.password} iconClass="fas fa-lock" onChange={changeHandler} />
      {(anError !== "")
        ? <ErrorMessage error={anError} cancelError={cancelError} /> : null
      }
      <button type="button" onClick={e => reAuth(userDetails.email, userDetails.password, setAccountInfoDisplayToggle, setAnError)} className='account-login-btn'>Login</button>
    </>
  );

  const resetEmailSentMessage = (
    <div>
      <h5>Password reset email has been sent to {userDetails.email}!</h5>
      <button type="button" onClick={e => setResetEmailSent(false)} className='account-login-btn'>Okay</button>
    </div>
  );

  return (
    <div className="auth-wrapper">
      <button onClick={handleToggle} className='btn btn-back'>{isUpdateForm ? "Return to Home" : <strong>Back to Login</strong>} </button>

      <h3>{isUpdateForm ? "Update Your details" : "Please complete this form"}</h3>
      <h5>{isUpdateForm ? "expand each section to alter your current details in place" : "You will be able to edit these details later"}</h5>
      <div className="auth-container">
        <div className='fields-container register'>
          <form onSubmit={handleSubmit}>
            <Section title="Account Info" isUpdate={isUpdateForm}>
              {
                isUpdateForm
                  ? (
                    resetEmailSent
                      ? resetEmailSentMessage
                      : (
                        accountInfoDisplayToggle
                          ? (changeEmailDisplay ? emailChange : accountButtons)
                          : loginToChangeDetails
                      )
                  )
                  : defaultForm
              }
            </Section>
            {/* plan is to turn this first section into its own component because of how unique it is that way it can handle its own error state too */}

            <Section title="Personal Info" isUpdate={isUpdateForm}>
              <SelectField label="Home State" name="residence" placeholder="Home State" id="residence" value={userDetails.residence} onChange={changeHandler} options={US_STATES} />
              <InputField label="Birth Date" type="date" name="birthDate" placeholder="e.g. 01/01/1990" id="birthDate" value={userDetails.birthDate} onChange={changeHandler} />
              <SelectField label="What race best describes you?" name="race" placeholder="Race" id="race" value={userDetails.race} onChange={changeHandler} options={RACE_OPTIONS} />
              <SelectField label="What ethnicity best describes you?" name="ethnicity" placeholder="Ethnicity" id="ethnicity" value={userDetails.ethnicity} onChange={changeHandler} options={ETHNICITY_OPTIONS} />
              <SelectField label="Biological Sex" name="bioSex" placeholder="Biological Sex" id="bioSex" value={userDetails.bioSex} onChange={changeHandler} options={BIOLOGICAL_SEX_OPTIONS} />
              <SelectField label="Level of Education" name="education" placeholder="Level of Education" id="education" value={userDetails.education} onChange={changeHandler} options={EDUCATION_OPTIONS} />
              <SelectField label="Please describe your living situation." name="household" placeholder="Living Situation" id="household" value={userDetails.household} onChange={changeHandler} options={HOUSEHOLD_OPTIONS} />
              <InputField label="Tell us some of your hobbies" type="textarea" name="hobbies" placeholder="Hobbies" id="hobbies" value={userDetails.hobbies} onChange={changeHandler} />
            </Section>
            <Section title="Your Story" isUpdate={isUpdateForm}>
              <InputField label="What date did you experience your loss?" type="date" name="lossDate" placeholder="e.g. 01/01/1990" id="lossDate" value={userDetails.lossDate} onChange={changeHandler} />
              <SelectField label="Relationship to the deceased" name="kinship" placeholder="Relationship to deceased" id="kinship" value={userDetails.kinship} onChange={changeHandler} options={KINSHIP_OPTIONS} />
              <SelectField label="Cause of Death" name="cause" placeholder="Cause of death" id="cause" value={userDetails.cause} onChange={changeHandler} options={CAUSE_OPTIONS} />
              <InputField label="How old were they?" type="number" name="deceasedAge" placeholder="age" id="deceasedAge" value={userDetails.deceasedAge} onChange={changeHandler} />
              <InputField label="Please describe your loss experience" type="textarea" name="lossExp" placeholder="" id="lossExp" value={userDetails.lossExp} onChange={changeHandler} />
            </Section>
            <div className='consent'>
              <input type="checkbox" name="consent" id="consent" value={consent} onChange={changeHandler}></input>
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
      <button onClick={handleToggle} className='btn btn-back margin-top-3'>{isUpdateForm ? "Return to Home" : <strong>Back to Login</strong>} </button>
    </div>
  );
}

UserDetailsForm.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};

export default UserDetailsForm;