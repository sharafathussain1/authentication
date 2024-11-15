"use client";

import Image from "next/image";

export default function Varify() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="verify-child flex items-center justify-center flex-col  w-11/12">
        <div className="img">
          <Image
            src={"/ok-1976099_1280.webp"}
            alt=""
            width={100}
            height={100}
          ></Image>
        </div>
        <div className="succes_message">
          <h1 className="text-slate-50 text-xl text-center">
            Email Sent Successfully!
          </h1>
          <p className="text-center">
            Please check your email inbox then click the link to verify your
            email and <b>Hit the refresh button</b>
          </p>
          <p className="text-center">Thank You!</p>
        </div>
        <div className="verify-btn flex gap-5 mt-5">
          {/* <button onClick={resent}>resent</button> */}
          <button
            className="w-full p-8 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
