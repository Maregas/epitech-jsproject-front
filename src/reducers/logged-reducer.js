import { LOGGED_ACTION } from '../actions/logged-actions';

export default function loggedReducer(state = false, { type, payload }) {
  switch (type) {
    case LOGGED_ACTION:
      return payload.logged;
    default:
      break;
  }
  return state;
}
