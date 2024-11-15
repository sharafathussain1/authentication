"use client";
import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const Router = useRouter();

  const formHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // call signUp function
    SignUpFunction(email, password, userName, confirmPassword);
  };
  // signup function
  const SignUpFunction = (
    email: string,
    password: string,
    userName: string,
    confirmPassword: string
  ) => {
    if (confirmPassword !== password) {
      setErrorMsg("Please! Confirm your password");
      return;
    }
    // firebase function
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const { email, uid } = userCredential.user;
        console.log("SignUp user +++++++++++" + email, uid, userName);
        sendEmailVerification(userCredential.user);
        Router.push("/verify");

        setEmail("");
        setpassword("");
        setConfirmPassword("");
        setUserName("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
        // ..
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-8 rounded-lg shadow-xl w-full bg-white max-w-md">
        <Image src="/logo3.png" alt="" width={100} height={10} />
        <h1 className="text-2xl font-semibold mb-6 text-center text-slate-500">
          Create your account
        </h1>

        <form onSubmit={formHandler}>
          {/* Username */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              name="username"
              required
              className=" bg-white text-slate-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
              className=" bg-white  text-slate-500  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* password */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              name="password"
              required
              className="  bg-white text-slate-500  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* confirm password */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name="Confirm Password"
              required
              className="  bg-white text-slate-500  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* error message */}
          <div
            className=" flex justify-between  text-red-600 mb-4 w-full p-2 border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            style={{ display: errorMsg ? "block" : "none" }}
          >
            <span className="flex justify-between relative text-red-600">
              <h4>{errorMsg}</h4>
              <span
                className="absolute left-[350px] cursor-pointer"
                onClick={() => setErrorMsg("")}
              >
                X
              </span>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-slate-600 mt-3">
            Allready have an account?..{" "}
            <Link className="text-blue-600" href={"/login"}>
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
