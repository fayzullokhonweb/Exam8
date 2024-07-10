import { Form, Link, useActionData } from "react-router-dom";

import videoBg from "../../public/assets/videobg.mp4";

// react-icons
import { FcGoogle } from "react-icons/fc";

// components
import { FormInput } from "../components";
import { useSignup } from "../hooks/useSignup";
import { useEffect } from "react";

// context

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  return { email, password, displayName, photoURL };
};

function Signup() {
  const userData = useActionData();
  const { register, registerWithGoogle } = useSignup();

  useEffect(() => {
    if (userData) {
      register(userData);
    }
  }, [userData]);
  return (
    <>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-black opacity-30 z-10"></div>
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-40"
      ></video>
      <div className="min-h-screen flex items-center justify-center gap-16 z-50 absolute w-full h-full top-0 ">
        <div className="max-w-xs lg:max-w-sm p-7  w-full  rounded-lg shadow-lg bg-slate-500/15 backdrop-blur-md ">
          <div className="mb-3 ">
            <Form method="POST" className="w-full">
              <h1 className="text-4xl text-center font-medium mb-3 text-white">
                SignUp
              </h1>
              <FormInput
                placeholder="User Name"
                type="text"
                name="displayName"
              />
              <FormInput placeholder="Email" type="email" name="email" />
              <FormInput placeholder="Photo Url" type="url" name="image" />
              <FormInput
                className="mb-4"
                placeholder="Password"
                type="password"
                name="password"
              />
              <button
                type="submit"
                className="btn btn-primary w-full mt-3 text-base"
              >
                Signup
              </button>

              <div className="mb-4">
                <p className="mt-1 text-center text-base w-full text-white">
                  Already have an account?
                  <Link
                    to="/login"
                    className="link link-primary   ml-1 no-underline hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className="w-full flex items-center">
                <div className="w-2/5 bg-white h-px opacity-25"></div>
                <div className="px-5">
                  <p className="text-lg -mt-1 text-white opacity-75">Or</p>
                </div>
                <div className="w-2/5 bg-white h-px opacity-25"></div>
              </div>
            </Form>
          </div>
          <div>
            <button
              onClick={registerWithGoogle}
              type="button"
              className="btn   w-full"
            >
              <span className="flex items-center w-full ">
                <span className="mr-10 lg:mr-20">
                  <FcGoogle className="w-6 h-6 " />
                </span>
                <span className="text-center ">Signup With Google</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
