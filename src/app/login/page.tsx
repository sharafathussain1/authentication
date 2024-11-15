"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { app } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const Router = useRouter();
  const formHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    SignIn(email, password);
  };

  const SignIn = (email: string, password: string) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential.user);
        if (userCredential.user.emailVerified == false) {
          Router.push("/verify");
        }

        // Signed in

        // console.log("LOGin User++++++++" + user);
        setMessage("Login successfuly");
        //  here navigate the home page
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <Image src="/logo3.png" alt="" width={100} height={10} />
        <h1 className="text-2xl font-semibold mb-6 text-center text-slate-500">
          Login into your account
        </h1>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>}
                  {success && <p className="text-green-500 mb-4">{success}</p>} */}
        <form onSubmit={formHandler}>
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
              className=" bg-white text-slate-500  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              required
              className=" bg-white  text-slate-500  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* forgot option  */}
          <Link href={"/forggotPassword"} className="text-blue-600">
            {" "}
            Forggot password?
          </Link>
          <div className="mb-6">
            {/* succes message */}
            {message && (
              <p className="flex justify-between  text-green-600  w-full p-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
                <span className="flex justify-between relative text-green-600">
                  <span className="text-center"> Signin successfuly</span>
                  <span className="loading loading-spinner loading-md ms-10"></span>
                  <span
                    className="absolute left-[350px] cursor-pointer"
                    onClick={() => setMessage("")}
                  >
                    X
                  </span>
                </span>
              </p>
            )}
            {/* error message */}
            {error && (
              <p className=" flex justify-between  text-red-600  w-full p-2 border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                <span className="flex justify-between relative text-red-600">
                  error message{" "}
                  <span
                    className="absolute left-[350px] cursor-pointer"
                    onClick={() => setError("")}
                  >
                    X
                  </span>
                </span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>

          <p className="text-center mt-3 text-slate-600">
            Don&apos;t have an account?...{" "}
            <Link className="text-blue-600" href={"/signup"}>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
