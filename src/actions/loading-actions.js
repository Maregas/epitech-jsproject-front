export const LOADING_ACTION = "loading:setLoading";

export function setLoading(isLoading) {
  return {
    type: LOADING_ACTION,
    payload: {
      loading: isLoading
    }
  };
}
