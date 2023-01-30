export default function ErrorMessage({ error, cancelError }) {
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