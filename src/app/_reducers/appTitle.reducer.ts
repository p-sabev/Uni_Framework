export const SET_TITLE = 'SET_TITLE';

export function setTitleReducer(state: string, action): string {
  switch (action.type) {
    case SET_TITLE:
      return action.payload;
    default:
      return state;
  }
}
