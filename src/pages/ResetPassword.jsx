import React from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(auth, emailVal)
      .then(() => {
        toast.success("Check your email");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="mt-24">
      <div className="grid items-start p-8 mx-auto sm:max-w-sm max-w-72 lg:max-w-md bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
        <div className="mb-14">
          <h1 className="text-gray-800 text-2xl font-extrabold">
            Forgot your Password?
          </h1>
          <p className="text-sm text-gray-500 mt-4">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500"
            required
          />
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3 w-full mt-6"
          >
            Send
          </button>
        </Form>
        <div className="text-center text-sm text-sky-600">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
