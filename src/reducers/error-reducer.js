import { ERROR_ACTION } from '../actions/error-actions';

export default function errorReducer(state = false, { type, payload }) {
  switch (type) {
    case ERROR_ACTION:
      return payload.error;
    default:
      break;
  }
  return state;
}
