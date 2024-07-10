import { Form, Link, useActionData } from "react-router-dom";
import videoBg from "../../public/assets/videobg.mp4";
import { FcGoogle } from "react-icons/fc";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useEffect } from "react";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { loginUser, isPending } = useLogin();
  const { isPending: isPendingUseRegister, registerWithGoogle } = useSignup();

  useEffect(() => {
    if (userData && userData.email && userData.password) {
      loginUser({ email: userData.email, password: userData.password });
    }
  }, [userData, loginUser]);

  return (
    <>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-black opacity-60 z-10"></div>
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-40"
      ></video>
      <div className="flex items-center justify-center gap-16 z-50 absolute w-full h-full top-0">
        <div className="max-w-xs lg:max-w-sm p-7 w-full rounded-lg shadow-lg bg-slate-500/15 backdrop-blur-md">
          <div className="mb-3">
            <Form method="post" className="w-full">
              <h1 className="text-4xl text-center font-medium text-white mb-3 mt-3">
                Login
              </h1>
              <div>
                <FormInput placeholder="Email" type="email" name="email" />
              </div>
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
                Login
              </button>
              <div className="text-center">
                <Link
                  to="/reset"
                  className="btn-block mt-3 btn btn-secondary text-white  "
                >
                  Forgot Password
                </Link>
              </div>
            </Form>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={registerWithGoogle}
              className="btn w-full"
            >
              <span className="flex items-center w-full">
                <span className="mr-10 lg:mr-20">
                  <FcGoogle className="w-6 h-6" />
                </span>
                <span className="text-center">Login With Google</span>
              </span>
            </button>
          </div>
          <div>
            <p className="mt-1 text-center text-base text-white w-full">
              Don't have an account?
              <Link
                to="/signup"
                className="link link-primary ml-1 no-underline hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
