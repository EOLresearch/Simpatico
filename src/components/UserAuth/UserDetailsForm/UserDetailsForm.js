import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import './userdetailsform.css';

import Section from './Section';
import InputField from './InputField';
import SelectField from './SelectField';

const UserDetailsForm = ({ auth, usersRef, handleToggleRegistrationPanel }) => {
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

const [anError, setAnError] = useState('')
const [consent, setConsent] = useState(false)


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

    // Validation rules
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
        { condition: !userDetails.consent, error: 'consent' }
    ];
    
    for (const validation of validations) {
        if (validation.condition) {
            setUserDetails(prevState => ({ ...prevState, anError: validation.error }));
            return;
        }
    }
    
    setUserDetails(prevState => ({ ...prevState, anError: '' }));
    createNewUser(e);
}


const changeHandler = (e) => {
    const { name, value } = e.target;

    // Special case for boolean toggles like 'consent'
    if (name === 'consent') {
        setConsent(prevConsent => !prevConsent);
        return;
    }

    setUserDetails(prevState => ({ ...prevState, [name]: value.trim() }));
}


  const createNewUser = async (e) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
        const user = userCredential.user;

        // Extract necessary details to create a new user
        const newUser = {
            uid: user.uid,
            ...userDetails,  // Spread the details
            simpaticoMatch: '',  // This remains static as before
        };

        // We'll remove keys that are not meant to be stored
        delete newUser.anError;
        delete newUser.password;
        delete newUser.confirmPass;

        await usersRef.doc(user.uid).set(newUser);

        await auth.currentUser.sendEmailVerification();
        handleToggleRegistrationPanel(e);
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
      <h3>Please complete this form</h3>
      <h5>You will be able to edit these details later</h5>
      <div className="auth-container">
  
        <div className='fields-container register'>
          <form onSubmit={handleSubmit}>
  
            <Section title="Account Info">
              <InputField label="" type="email" name="email" placeholder="Email" id="email" value={userDetails.email} iconClass="fas fa-envelope" onChange={changeHandler} />
              <InputField label="" type="password" name="password" placeholder="Password" id="password" value={userDetails.password} iconClass="fas fa-lock" onChange={changeHandler} />
              <InputField label="" type="password" name="confirmPass" placeholder="Confirm Password" id="confirmPass" value={userDetails.confirmPass} iconClass="fas fa-lock" onChange={changeHandler} />
              <InputField label="" type="text" name="displayName" placeholder="Display Name" id="name" value={userDetails.displayName} iconClass="fas fa-user-alt" onChange={changeHandler} />
            </Section>
  
            <Section title="Personal Info">
              <SelectField label="Home State" name="residence" placeholder="Home State" id="residence" value={userDetails.residence} onChange={changeHandler} options={[/* array of state options here */]} />
              <InputField label="Birth Date" type="date" name="birthDate" placeholder="e.g. 01/01/1990" id="birthDate" value={userDetails.birthDate} onChange={changeHandler} />
              <SelectField label="What race best describes you?" name="race" placeholder="Race" id="race" value={userDetails.race} onChange={changeHandler} options={[/* array of race options here */]} />
              <SelectField label="What ethnicity best describes you?" name="ethnicity" placeholder="Ethnicity" id="ethnicity" value={userDetails.ethnicity} onChange={changeHandler} options={[/* array of ethnicity options here */]} />
              <SelectField label="Biological Sex" name="bioSex" placeholder="Biological Sex" id="bioSex" value={userDetails.bioSex} onChange={changeHandler} options={[/* array of bioSex options here */]} />
              <SelectField label="Level of Education" name="education" placeholder="Level of Education" id="education" value={userDetails.education} onChange={changeHandler} options={[/* array of education options here */]} />
              <SelectField label="Please describe your living situation." name="household" placeholder="Living Situation" id="household" value={userDetails.household} onChange={changeHandler} options={[/* array of household options here */]} />
              <InputField label="Tell us some of your hobbies" type="textarea" name="hobbies" placeholder="Hobbies" id="hobbies" value={userDetails.hobbies} onChange={changeHandler} />
            </Section>
  
            <Section title="Your Story">
              <InputField label="What date did you experience your loss?" type="date" name="lossDate" placeholder="e.g. 01/01/1990" id="lossDate" value={userDetails.lossDate} onChange={changeHandler} />
              <SelectField label="Relationship to the deceased" name="kinship" placeholder="Relationship to deceased" id="kinship" value={userDetails.kinship} onChange={changeHandler} options={[/* array of kinship options here */]} />
              <SelectField label="Cause of Death" name="cause" placeholder="Cause of death" id="cause" value={userDetails.cause} onChange={changeHandler} options={[/* array of cause options here */]} />
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
        <button onClick={handleToggleRegistrationPanel} className='btn btn-back'> Already joined? <strong>Login now</strong></button>
    </div>
  );

}

UserDetailsForm.propTypes = {
  auth: PropTypes.object.isRequired,
  usersRef: PropTypes.object.isRequired,
  handleToggleRegistrationPanel: PropTypes.func.isRequired,
};

export default UserDetailsForm;