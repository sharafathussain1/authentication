import Image from "next/image";
import Link from "next/link";
export default function ForggotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <Image src="/logo3.png" alt="" width={100} height={10} />
        <h1 className="text-2xl font-semibold mb-1 text-center text-slate-700">
          Forggot password
        </h1>
        <p className="text-sm text-center  mb-4">
          Enter you email to recieve reset password link
        </p>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>} */}
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="bg-white focus:bg-white  text-slate-500  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Send reset link
          </button>

          <p className="text-center mt-4">
            Remember your password?{" "}
            <Link href={"/login"} className="text-blue-600">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
