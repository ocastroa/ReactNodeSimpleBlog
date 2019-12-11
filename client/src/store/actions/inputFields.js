export const EDIT_FIELDS = 'EDIT_FIELDS';

export const editFields = (key, event) => {
  return {
    type: EDIT_FIELDS,
    payload: { key, event }
  };
};
