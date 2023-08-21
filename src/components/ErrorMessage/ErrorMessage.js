import './errormessage.css';

export default function ErrorMessage({ error, cancelError }) {
//needs refactor

//appears in two places when the login for changing account details is missed, the errors for no pass is also  

  const errorMaker = (err) => {

    switch (err) {
      case 'passwordreset':
        return "Password reset email sent, check your email."
      case 'auth/wrong-password':
        return "Incorrect password"
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
      case 'noresidence':
        return "Please enter your home state"
      case 'nobirth':
        return "Please enter your birthday"
      case 'under18':
        return "You must be 18 or older to register"
      case 'norace':
        return "Please enter something for Race. You can enter 'prefer not to disclose' if you wish."
      case 'noethnicity':
        return "Please enter something for Ethnicity. You can enter 'prefer not to disclose' if you wish."
      case 'nobiosex':
        return "Please enter something for Biological Sex. You can enter 'prefer not to disclose' if you wish."
      case 'noeducation':
        return "Please enter your level of Education."
      case 'nohousehold':
        return "Please answer the question about your living situation."
      case 'nohobbies':
        return "Please provide some of your Hobbies."
      case 'nolossdate':
        return "Please enter a date of loss"
      case 'nokinship':
        return "Please enter kinship to the deceased"
      case 'nocause':
        return "Please enter cause of death"
      case 'nodeceasedage':
        return "Please enter age of the deceased"
      case 'nolossexp':
        return "Please share something about your loss experience"
      case 'consent':
        return "You must consent to share your information"
      case 'noemailchange':
        return "Please check the box confirming your email change"
      default:
        console.log('switch default' + error)
        return "Something went wrong. Please try again."
    }
  }
  return (
    <div key={error} className='error-message' onClick={cancelError}>
      <p>{errorMaker(error)}</p><div className='x-btn'>✕</div>
    </div>
  )
}