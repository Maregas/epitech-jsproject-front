import { setLoading } from "./loading-actions";
import { setLogged } from './logged-actions';

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
        dispatch({
          type: LOGIN_USER,
          payload: {
            user: {
              email: json.email,
              nickname: json.nickname,
              token: `${json.tokenType} ${json.token}`
            }
          }
        });
      });
  };
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
