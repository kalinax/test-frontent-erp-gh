"use client";
import { Button } from "flowbite-react";
import { useState } from "react";
import { api } from "../services/api";
import { useRouter } from "next/navigation";
import { auth } from '@/services/auth';

export function EmailVerificationOTPForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(`#code-${index + 2}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const email = localStorage.getItem('email');
      if (!email) {
        setError("Email not found. Please try logging in again.");
        setLoading(false);
        return;
      }

      const response = await api.verifyOTP(otpString, email);
      if (response.message?.includes("successfully")) {
        auth.handleLoginSuccess({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          user: response.user
        });
        router.push('/dashboard');
      } else {
        setError(response.detail || 'An error occurred during OTP verification');
      }
    } catch (err: any) {
      setError(err.response?.detail || 'An error occurred during OTP verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white px-4 py-8 dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="bg-primary-600 hidden w-full max-w-md p-12 lg:block lg:h-screen">
          <div className="mb-8 flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center text-2xl font-semibold text-white"
            >
              <img alt="" src="./gh_small_logo.svg" className="mr-2 size-11" />
            </a>
            <a
              href="/login"
              className="text-primary-100 inline-flex items-center text-sm font-medium hover:text-white"
            >
              <svg
                className="mr-1 size-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Go back
            </a>
          </div>
        </div>
        <div className="mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0">
          <div className="w-full">
            <div className="mb-8 flex items-center justify-center space-x-4 lg:hidden">
              <a href="#" className="flex items-center text-2xl font-semibold">
                <img
                  alt=""
                  className="mr-2 size-8"
                  src="./gh_small_logo.svg"
                />
              </a>
            </div>
            <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Verify your email address
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              We emailed you a six-digit code to&nbsp;
              <span className="font-medium text-gray-900 dark:text-white">
                {localStorage.getItem('email') || 'your email'}
              </span>
              . Enter the code below to confirm your email address.
            </p>
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="my-4 flex space-x-2 sm:space-x-4 md:my-6">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index}>
                    <label htmlFor={`code-${index + 1}`} className="sr-only">
                      {`Digit ${index + 1}`}
                    </label>
                    <input
                      id={`code-${index + 1}`}
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      required
                      type="text"
                      className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                    />
                  </div>
                ))}
              </div>
              <p className="mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
                Make sure to keep this window open while checking your inbox.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="submit"
                  size="xl"
                  className="[&>span]:text-sm bg-ghred-500 hover:bg-ghred-600 w-full"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
