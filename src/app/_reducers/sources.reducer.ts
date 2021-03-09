
import { Source } from '../_models/source';

export const ADD_SOURCES = 'ADD_SOURCES';

export function addSourcesReducer(state: Source[] = [], action): Source[] {
  switch (action.type) {
    case ADD_SOURCES:
      return action.payload;
    default:
      return state;
  }
}
