import React from "react";
import { useState } from "react";
import { authenticationService } from "../../services/authentication.service";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import "./styles.css";
import { inputClasses } from "../../helpers/form-utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Record<string, boolean>>({});

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const errorNew = {
      username: username ? false : true,
      password: password ? false : true,
    };

    setError(errorNew);

    if (username && password) {
      authenticationService.login(username, password);
    }
  };
  const signInHandler = () => {
    authenticationService.token.subscribe((token) => {
      if (token) {
        navigate("/orders");
      }
    });
  };
  const handleInput = (input: string, value: string) => {
    if (error[input] && value) {
      setError({ ...error, [input]: false });
    }
    if (input === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    value={username}
                    onChange={(e) => handleInput("username", e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    // eslint-disable-next-line max-len
                    className={inputClasses(error.username)}
                  />
                  {error.username && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {error.username && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Username is required
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    value={password}
                    onChange={(e) => handleInput("password", e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid="true"
                    aria-describedby="email-error"
                    className={inputClasses(error.password)}
                  />
                  {error.password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {error.password && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Password is required
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={signInHandler}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
