import React, { useState } from "react";
import {
    GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


//   for google sign in 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //for sign out
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };




const handleGithubSignIn = () => {
    signInWithPopup(auth,githubProvider)
    .then(result => {
        const user = result.user;
        setUser(user)
    })
    .catch(error => {
        console.log(error.message);
    })
}
console.log(user);
  return (
    <div>
      {user
       ? 
        <button onClick={handleSignOut}>Sign Out</button>
       : 
        <>
        <button onClick={handleGoogleSignIn}>Google Login</button>
        <button onClick={handleGithubSignIn}>Github Login</button>
        </>
      }

      <div>
        <h3>Display Name: {user?.displayName}</h3>
        <p>Email: {user?.email}</p>
        <img src={user?.photoURL} alt="" />
      </div>
    </div>
  );
};

export default Login;
