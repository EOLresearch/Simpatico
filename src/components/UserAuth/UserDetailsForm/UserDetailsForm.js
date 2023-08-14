import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import './userdetailsform.css';

import Section from './Section';
import InputField from './InputField';
import SelectField from './SelectField';

import { auth, firestore } from '../../../firebase-config';

import { US_STATES, RACE_OPTIONS, ETHNICITY_OPTIONS, BIOLOGICAL_SEX_OPTIONS, EDUCATION_OPTIONS, HOUSEHOLD_OPTIONS, KINSHIP_OPTIONS, CAUSE_OPTIONS } from "../../../helpers/optionsArrays";

const UserDetailsForm = ({ handleToggle, fsUser, updateFsUser }) => {
  const [anError, setAnError] = useState('')
  const [consent, setConsent] = useState(false)
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

  const cancelError = () => {
    setAnError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validations = [
      { condition: !userDetails.email.trim(), error: 'auth/missing-email' },
      { condition: !userDetails.password, error: 'nopass' },
      { condition: userDetails.password !== userDetails.confirmPass, error: 'nomatchpass' },
      { condition: !userDetails.residence, error: 'noresidence' },
      { condition: !userDetails.birthDate, error: 'nobirth' },
      { condition: !over18Bouncer(userDetails.birthDate), error: 'under18' },
      { condition: !userDetails.race, error: 'norace' },
      { condition: !userDetails.ethnicity, error: 'noethnicity' },
      { condition: !userDetails.bioSex, error: 'nobiosex' },
      { condition: !userDetails.education, error: 'noeducation' },
      { condition: !userDetails.household, error: 'nohousehold' },
      { condition: !userDetails.hobbies, error: 'nohobbies' },
      { condition: !userDetails.lossDate, error: 'nolossdate' },
      { condition: !userDetails.kinship, error: 'nokinship' },
      { condition: !userDetails.cause || userDetails.cause === 'Cause of death', error: 'nocause' },
      { condition: !userDetails.deceasedAge, error: 'nodeceasedage' },
      { condition: !userDetails.lossExp, error: 'nolossexp' },
    ];

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

    createNewUser(e);

  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({ ...prevState, [name]: value }));
    if (name === 'consent') {
      setConsent(!consent)
    }
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

      delete newUser.anError;
      delete newUser.password;
      delete newUser.confirmPass;

      const usersRef = firestore.collection('users');
      await usersRef.doc(user.uid).set(newUser);
      await auth.currentUser.sendEmailVerification();
      handleToggle(e);
    } catch (error) {
      console.log(error.code, error.message);
      setUserDetails(prevState => ({
        ...prevState,
        anError: error.code
      }));
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
    <div className="auth-wrapper">
      <button onClick={handleToggle} className='btn btn-back'>{fsUser ? "Return to Home" :  <strong>Back to Login</strong>} </button>

      <h3>{fsUser ? "Update Your details": "Please complete this form"}</h3>
      <h5>{fsUser ? "":"You will be able to edit these details later"}</h5>
      <div className="auth-container">
        <div className='fields-container register'>
          <form onSubmit={handleSubmit}>
            <Section title="Account Info" isUpdate={fsUser ? false : true}>
              <InputField label="" type="email" name="email" placeholder="Email" id="email" value={userDetails.email} iconClass="fas fa-envelope" onChange={changeHandler} />
              <InputField label="" type="password" name="password" placeholder="Password" id="password" value={userDetails.password} iconClass="fas fa-lock" onChange={changeHandler} />
              <InputField label="" type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={userDetails.confirmPass} iconClass="fas fa-lock" onChange={changeHandler} />
              <InputField label="" type="text" name="displayName" placeholder="Display Name" id="name" value={userDetails.displayName} iconClass="fas fa-user-alt" onChange={changeHandler} />
            </Section>
            <Section title="Personal Info" isUpdate={fsUser ? false : true}>
              <SelectField label="Home State" name="residence" placeholder="Home State" id="residence" value={userDetails.residence} onChange={changeHandler} options={US_STATES} />
              <InputField label="Birth Date" type="date" name="birthDate" placeholder="e.g. 01/01/1990" id="birthDate" value={userDetails.birthDate} onChange={changeHandler} />
              <SelectField label="What race best describes you?" name="race" placeholder="Race" id="race" value={userDetails.race} onChange={changeHandler} options={RACE_OPTIONS} />
              <SelectField label="What ethnicity best describes you?" name="ethnicity" placeholder="Ethnicity" id="ethnicity" value={userDetails.ethnicity} onChange={changeHandler} options={ETHNICITY_OPTIONS} />
              <SelectField label="Biological Sex" name="bioSex" placeholder="Biological Sex" id="bioSex" value={userDetails.bioSex} onChange={changeHandler} options={BIOLOGICAL_SEX_OPTIONS} />
              <SelectField label="Level of Education" name="education" placeholder="Level of Education" id="education" value={userDetails.education} onChange={changeHandler} options={EDUCATION_OPTIONS} />
              <SelectField label="Please describe your living situation." name="household" placeholder="Living Situation" id="household" value={userDetails.household} onChange={changeHandler} options={HOUSEHOLD_OPTIONS} />
              <InputField label="Tell us some of your hobbies" type="textarea" name="hobbies" placeholder="Hobbies" id="hobbies" value={userDetails.hobbies} onChange={changeHandler} />
            </Section>
            <Section title="Your Story"isUpdate={fsUser ? false : true}>
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
      <button onClick={handleToggle} className='btn btn-back margin-top-3'>{fsUser ? "Return to Home" :  <strong>Back to Login</strong>} </button>
    </div>
  );

}

UserDetailsForm.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};

export default UserDetailsForm;