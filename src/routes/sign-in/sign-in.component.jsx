import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

function SignIn() {
  useEffect(() => {
    async function fetchRedirectResult() {
      const response = await getRedirectResult(auth);
      console.log("response in fetchRedirectResult =>", response);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log("userDocRef in fetchRedirectResult =>", userDocRef);
      }
    }
    fetchRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log("user =>", user);

    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("userDocRef in logGoogleUser =>", userDocRef);
  };

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log("user =>", user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect
      </button>
    </div>
  );
}

export default SignIn;
