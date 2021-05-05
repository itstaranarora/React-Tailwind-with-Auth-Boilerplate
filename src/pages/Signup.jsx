import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import useAuth from "hooks/useAuth";
import Button from "elements/Button";
import Note from "elements/Note";
import FormHelperText from "elements/FormHelperText";
import { setAccess, setRefresh } from "utils/token";
import { registerUser } from "services/api";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState({
    username: false,
    password: false,
    note: false,
  });
  const history = useHistory();
  const { isLoggedIn, setLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (validateFields()) return false;
    const data = JSON.stringify({
      username: username,
      password: password,
      key: "abc",
    });
    registerUser(data)
      .then((res) => {
        if (res.status === 201) {
          setLoggedIn();
          setAccess(res.data.access);
          setRefresh(res.data.refresh);
          history.push("/");
          return;
        }
      })
      .catch((err) => {
        setNote(err?.response?.data.detail);
        setError({ ...error, note: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const validateFields = () => {
    if (username === "" || username == null) {
      setError({ ...error, username: true });
      setLoading(false);
      return true;
    }
    if (password === "" || password == null) {
      setError({ ...error, password: true });
      setLoading(false);
      return true;
    }

    return false;
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-2xl text-primary-900 tracking-wide ml-2 font-semibold">
              Brand
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-primary-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Sign Up
          </h2>
          <div className="mt-12">
            <form>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type=""
                  placeholder="mike@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {error.username && (
                  <FormHelperText type="error">
                    Email is required
                  </FormHelperText>
                )}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <Link
                      to="/"
                      className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && (
                  <FormHelperText type="error">
                    Password is required
                  </FormHelperText>
                )}
              </div>
              <div className="my-10">
                <Button
                  loading={loading}
                  loadingText="Creating your account"
                  onClick={handleSubmit}
                  className="p-4 w-full rounded-full tracking-wide font-semibold"
                >
                  Signup
                </Button>
              </div>
              {error.note && (
                <Note type="error" label="Error">
                  {note}
                </Note>
              )}
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="cursor-pointer text-primary-900 hover:text-indigo-800"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"></div>
      </div>
    </div>
  );
}
