import actions from './actions/index';
const initialState = {
  banks: null,
  categories: null,
};

export default function BankState(state = initialState, action) {
  switch (action.type) {
    case actions.GET_BANK_SUCCESS:
      let _bank = null;
      action.response.data.forEach((bank) => {
        _bank = {
          ..._bank,
          [bank.id]: bank,
        };
      });
      return {
        ...state,
        banks: { ..._bank },
      };
    case actions.GET_CATEGORY_SUCCESS:
      let _category = null;
      action.response.data.forEach((category) => {
        _category = {
          ..._category,
          [category.code]: category,
        };
      });
      return {
        ...state,
        categories: _category ? { ..._category } : null,
      };
    default:
      return state;
  }
}
