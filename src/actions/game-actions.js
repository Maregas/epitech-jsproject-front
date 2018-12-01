import { SERVER_URL } from "../serverConfig";
import { setLoading } from "./loading-actions";

export const GAME_ACTION = "game:retrivegames";

export function retrieveGames(userToken) {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(SERVER_URL + "/api/game/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.statusText;
      })
      .then(json => {
        dispatch({
          type: GAME_ACTION,
          payload: {
            games: json
          }
        });
        dispatch(setLoading(false));
      });
  };
}
