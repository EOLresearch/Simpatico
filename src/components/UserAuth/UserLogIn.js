import './userlogin.css';


export default function UserLogIn({ firebase }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <div className="wrapper">
        <div className="container">
          <div className="col-left">
            <div className="login-container">
              <h2>Login</h2>
              <form>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <input className="btn" type="submit" value="Sign In" />
                  <button className="btn-forgot">Forget Password?</button>
              </form>
            </div>
          </div>
          <div className="col-right">
            <div className="login-with">
              <h2>Login with</h2>
              <button className="btn btn-go" onClick={googleSignIn}>Google</button>
              <button className="btn btn-fb" >Facebook</button>
            </div>
          </div>
        </div>
      </div>
  )
}