import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Spinner from "../spinner/spinner.component";

import {
  signInWithGooglePopupAction,
  signInAuthWithEmailAndPasswordAction,
} from "../../store/user/user.slice";

import { selectUserIsLoadingSignIn } from "../../store/user/user.selector";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoadingSignIn);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(1);
    try {
      dispatch(signInAuthWithEmailAndPasswordAction({ email, password }));

      console.log(2);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = () => {
    dispatch(signInWithGooglePopupAction());
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASSES.google}
              onClick={signInWithGoogle}
            >
              Google Sign In
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignInForm;
