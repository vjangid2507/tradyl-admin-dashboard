import { BehaviorSubject } from "rxjs";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const TOKEN_KEY = "token";

const token = localStorage.getItem(TOKEN_KEY);

const tokenSubject = new BehaviorSubject(token);

const LOGIN_URL = "http://dev.tradyl.com/auth-service/token";

const isLoggedIn = (): boolean => {
  return tokenSubject.value == null ? false : true;
};

const login = async (username: string, password: string) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      LOGIN_URL,
      {},
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );

    localStorage.setItem(TOKEN_KEY, response.data.data);
    tokenSubject.next(response.data.data);

    toast.success("Success logged in");
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error("Invalid Username or Password.");
    } else {
      toast.error("Something went wrong.");
    }
  }
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem(TOKEN_KEY);
  tokenSubject.next(null);
};

export const authenticationService = {
  login,
  logout,
  isLoggedIn,
  token: tokenSubject.asObservable(),
  get tokenValue() {
    return tokenSubject.value;
  },
};
