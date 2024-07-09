import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const loginUser = async ({ email, password }) => {
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      setIsPending(false);
      dispatch(login(user));
      toast.success(`Welcome ${user.displayName || "User"}!`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };

  return { isPending, loginUser };
};
