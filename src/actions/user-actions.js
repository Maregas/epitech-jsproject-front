export const LOGIN_USER = "user:login";

export function loginUser(userInfos) {
  return {
    type: LOGIN_USER,
    payload: {
      user: userInfos
    }
  }
}
