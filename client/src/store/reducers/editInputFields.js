import { EDIT_FIELDS } from '../actions/inputFields';

const initState = {
  title: '',
  author: '',
  body: ''
};

export const editInputFieldsReducer = (state = initState, action) => {
  switch (action.type) {
    case EDIT_FIELDS:
      return {
        ...state,
        [action.payload.key]: action.payload.event
      };

    default:
      return state;
  }
};
