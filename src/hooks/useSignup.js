import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const register = async ({ email, password, displayName }) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName });

      const user = userCredential.user;

      setIsPending(false);
      dispatch(login(user));
      toast.success(`Welcome ${user.displayName}!`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome , ${user.displayName}`);
      dispatch(login(user));
    } catch (error) {
      const errorMessage = error.message;
      toast.error(error.message);
    }
  };

  return { isPending, registerWithGoogle, register };
};
