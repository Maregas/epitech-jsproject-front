import { GAME_ACTION } from "../actions/game-actions";

export default function gameReducer(state = [], { type, payload }) {
  switch (type) {
    case GAME_ACTION:
      return payload.games;
    default:
      break;
  }
  return state;
}
