import { LOADING_ACTION } from '../actions/loading-actions';

export default function loadingReducer(state = false, { type, payload }) {
  switch (type) {
    case LOADING_ACTION:
      return payload.loading;
    default:
      break;
  }
  return state;
}
