import { LOGIN_USER } from '../actions/user-actions';

export default function userReducer(state = null, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return payload.user;
    default:
      break;
  }
  return state;
}
