import HomeButton from "../HomeButton";
// Importing the useState hook from React, which is used to manage the state of variables inside functional components.
import { useState } from "react";

// Importing the Firebase authentication object (auth) and the Google provider object from the Firebase configuration file.
// `auth` manages authentication operations, and `googleProvider` will allow Google sign-in.
import { auth, googleProvider } from "../Config/firebase";

// Importing Firebase authentication functions.
// - `createUserWithEmailAndPassword` allows creating new users with an email and password.
// - `signInWithPopup` lets users sign in using a popup window, like signing in with Google.
// - `signOut` signs the current user out of the session.
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Defining the `Auth` component. This is a functional React component that handles user authentication.
export const Auth = () => {
  // useState is a React hook that allows you to add state (variables) to a functional component.
  // We're using `useState` to manage the email and password entered by the user.
  // `email` is the variable that stores the email entered by the user, and `setEmail` is the function to update it.
  // Initially, the email is set to an empty string ("").
  const [email, setEmail] = useState("");

  // Similarly, `password` stores the user's password, and `setPassword` updates it.
  // It also starts as an empty string ("").
  const [password, setPassword] = useState("");

  // This function handles signing in the user with their email and password.
  // It's marked `async` because Firebase's `createUserWithEmailAndPassword` is a promise-based function, meaning it performs an action that takes time and may not complete immediately.
  const signIn = async () => {
    try {
      // Attempt to create a user with the email and password entered by the user.
      // If this is a new user, Firebase will create the account and sign them in.
      // `auth` is the Firebase authentication instance, `email` is the user's email, and `password` is their password.
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      // If there's an error (for example, if the email is already in use), it will be caught here and logged to the console.
      console.error(err);
    }
  };

  // This function handles signing in the user with Google by using a popup window.
  // It's also an `async` function because signing in with Google is a promise-based operation.
  const signInWithGoogle = async () => {
    try {
      // This line triggers a popup window where the user can sign in with their Google account.
      // Firebase will handle the sign-in flow and automatically manage the user's session.
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      // If there's an error (for example, if the popup is blocked), it will be caught and logged to the console.
      console.error(err);
    }
  };

  // This function handles signing out the current user from Firebase authentication.
  const logout = async () => {
    try {
      // This function signs out the currently authenticated user.
      await signOut(auth);
    } catch (err) {
      // If there's an error during the sign-out process, it will be caught and logged to the console.
      console.error(err);
    }
  };

  // The return statement defines the UI of the `Auth` component.
  // It returns a form where users can enter their email and password, and buttons for signing in, signing in with Google, and signing out.
  return (
    <div className="auth-container"> {/* This is a div container for the authentication form. */}
      {/* Input field for the email address. */}
      {/* The `onChange` event is triggered whenever the user types something in the input field.
          We're using `setEmail` to update the `email` state variable with the value the user enters. */}
      <input
        type="email" // Sets the input type to "email" to display a keyboard optimized for email on mobile devices.
        placeholder="Email" // Placeholder text that shows up inside the input field when it's empty.
        onChange={(e) => setEmail(e.target.value)} // When the input value changes, the email state is updated with the new value.
      />

      {/* Input field for the password. */}
      {/* Similar to the email field, `onChange` updates the `password` state variable whenever the user types in this field. */}
      <input
        type="password" // Sets the input type to "password", which hides the characters as the user types.
        placeholder="Password" // Placeholder text for the password input field.
        onChange={(e) => setPassword(e.target.value)} // Updates the password state with the value the user enters.
      />

      {/* Button to trigger the `signIn` function, which signs the user in with their email and password. */}
      <button onClick={signIn}>Sign In</button>
      <HomeButton />

      {/* Button to trigger the `signInWithGoogle` function, which signs the user in using Google through a popup window. */}
      <button onClick={signInWithGoogle}>Sign In With Google</button>

      {/* Button to trigger the `logout` function, which logs the current user out. */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Exporting the `Auth` component so that it can be imported and used in other parts of the app.
export default Auth;
