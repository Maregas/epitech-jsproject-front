import { setLoading } from "./loading-actions";
import { setLogged } from "./logged-actions";
import { setError } from "./error-actions";
import cookie from "react-cookies";
import { SERVER_URL } from "../serverConfig";

export const LOGIN_USER = "user:login";
export const LOGOUT_USER = "user:logout";

export function logoutUser(token) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(SERVER_URL + "/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(setLoading(false));
        if (res.ok) return res.json();
      })
      .then(json => {
        console.log(json);
        if (json.success) {
          dispatch(setLogged(false));
          dispatch(actionUser("", {}, LOGOUT_USER));
        }
      });
  };
}

export function loginUser(userInfos) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(SERVER_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfos)
    })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(json => {
        dispatch(setLoading(false));
        if (!json || json.success !== true) {
          dispatch(setError(true));
          return;
        }
        dispatch(actionUser(json.token, json, LOGIN_USER));
        dispatch(setLogged(true));
      });
  };
}

function actionUser(token, user, type) {
  if (type === LOGOUT_USER) {
    cookie.remove("USER_TOKEN");
    return {
      type: LOGOUT_USER,
      payload: {
        user: {}
      }
    };
  } else {
    cookie.save("USER_TOKEN", token);
    return {
      type: LOGIN_USER,
      payload: {
        user: {
          email: user.email,
          nickname: user.nickname,
          token: token
        }
      }
    };
  }
}

export function registerUser(userInfos) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(SERVER_URL + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfos)
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.statusText;
      })
      .then(json => {
        console.log(json);
        dispatch(setLoading(false));
      });
  };
}

export function checkTokenIsValid(userToken) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(SERVER_URL + "/api/account/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch(setLoading(false));
        return res.statusText;
      })
      .then(json => {
        dispatch(setLoading(false));
        if (json.success) {
          dispatch(actionUser(userToken, json.user, LOGIN_USER));
          dispatch(setLogged(true));
        } else cookie.remove("USER_TOKEN");
      });
  };
}
