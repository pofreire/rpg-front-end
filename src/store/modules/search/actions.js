export function searchRequest(search) {
  return {
    type: '@search/SEARCH_REQUEST',
    payload: { search },
  };
}

export function searchSuccess() {
  return {
    type: '@search/SEARCH_SUCCESS',
  };
}

export function searchFailure() {
  return {
    type: '@search/SEARCH_FAILURE',
  };
}
