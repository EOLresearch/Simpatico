import './errormessage.css';

export default function ErrorMessage({ error, cancelError }) {
  const errorMessages = {
    'passwordreset': "Password reset email sent, check your email.",
    'auth/wrong-password': "Incorrect password",
    'auth/user-not-found': "User not found.",
    'auth/internal-error': "Problem with email or password",
    'auth/missing-email': "Email is missing",
    'auth/invalid-email': "Email is invalid",
    'auth/email-already-in-use': "Email is already in use",
    'auth/weak-password': "Password should be at least 6 characters",
    'nopass': "Please enter a password",
    'nomatchpass': "Passwords do not match",
    'noresidence': "Please enter your home state in the 'Personal Info' section",
    'nobirth': "Please enter your birthday in the 'Personal Info' section",
    'under18': "You must be 18 or older to register",
    'norace': "Please enter something for Race in the 'Personal Info' section. You can enter 'prefer not to disclose' if you wish.",
    'noethnicity': "Please enter something for Ethnicity in the 'Personal Info' section. You can enter 'prefer not to disclose' if you wish.",
    'nobiosex': "Please enter something for Biological Sex in the 'Personal Info' section. You can enter 'prefer not to disclose' if you wish.",
    'noeducation': "Please enter your level of Education in the 'Personal Info' section.",
    'nohousehold': "Please answer the question about your living situation in the 'Personal Info' section.",
    'nohobbies': "Please provide some of your Hobbies in the 'Personal Info' section.",
    'nolossdate': "Please enter a date of loss in the 'Your Story' section",
    'nokinship': "Please enter kinship to the deceased in the 'Your Story' section",
    'nocause': "Please enter cause of death in the 'Your Story' section",
    'nodeceasedage': "Please enter age of the deceased",
    'nolossexp': "Please share something about your loss experience in the 'Your Story' section",
    'noconsent': "You must consent to share your information",
    'noemailchange': "Please check the box confirming your email change"
  };

  const getErrorMessage = (err) => {
    return errorMessages[err] || "Something went wrong. Please try again.";
  };

  return (
    <div key={error} className='error-message' onClick={cancelError}>
      <p>{getErrorMessage(error)}</p><div className='x-btn'>✕</div>
    </div>
  );
}
