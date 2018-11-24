export const LOGGED_ACTION = "logged:setLogged";

export function setLogged(isLogged) {
  return {
    type: LOGGED_ACTION,
    payload: {
      logged: isLogged
    }
  };
}
