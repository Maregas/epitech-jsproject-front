import { GAME_ACTION } from "../actions/game-actions";

const game = [
  {
    id: 0,
    name: "",
    description: "",
    background_image_url: ""
  }
];

export default function gameReducer(state = game, { type, payload }) {
  switch (type) {
    case GAME_ACTION:
      return payload.games;
    default:
      break;
  }
  return state;
}
