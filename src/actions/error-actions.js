export const ERROR_ACTION = "error:setError";

export function setError(isError) {
  return {
    type: ERROR_ACTION,
    payload: {
      error: isError
    }
  };
}
