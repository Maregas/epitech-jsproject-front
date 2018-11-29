import { setLoading } from "./loading-actions";
import { setLogged } from './logged-actions';
import cookie from 'react-cookies'

export const LOGIN_USER = "user:login";

export function loginUser(userInfos) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch("http://localhost:8080/api/login", {
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
        if (json.auth !== true) {
          dispatch(setLogged(false));
          return
        }
        dispatch(setLogged(true));
        dispatchUser(json.token, json, dispatch)
      });
  };
}

function dispatchUser(token, user, dispatch) {
  cookie.save('USER_TOKEN', token);
  dispatch({
    type: LOGIN_USER,
    payload: {
      user: {
        email: user.email,
        nickname: user.nickname,
        token: `${user.tokenType} ${user.token}`
      }
    }
  });
}

export function registerUser(userInfos) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch("http://localhost:8080/api/signup", {
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
    fetch("http://localhost:8080/api/account/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.statusText;
      })
      .then(json => {
        if (json.valid) {
          dispatch(setLogged(true));
          dispatchUser(userToken, json.user, dispatch);
        } else cookie.remove('USER_TOKEN')
      });
  };
}
