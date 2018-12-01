import { LOGIN_USER } from '../actions/user-actions';

const user = {
  email: "",
  nickname: "",
  token: ""
};

export default function userReducer(state = user, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return payload.user;
    default:
      break;
  }
  return state;
}
