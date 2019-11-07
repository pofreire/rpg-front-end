import produce from 'immer';

const INITIAL_STATE = {
  search: '',
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@search/SEARCH_REQUEST': {
        draft.search = action.payload.search;
        break;
      }

      default:
    }
  });
}
