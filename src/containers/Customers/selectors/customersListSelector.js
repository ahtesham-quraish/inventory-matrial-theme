import { createSelector } from 'reselect';
const customersState = (state) => state.CustomerState.customers;

const customersDataSelector = createSelector(
  [customersState],
  (customers) => {
    let data = [];
    let phone = null;
    if (customers) {
      customers.reduce((index, val) => {
        phone = val.Phone;
        phone = phone ? phone.toString() : 'N/A';
        return data.push([
          `${val.fName} ${val.lName}`,
          val.Address1,
          phone,
          val.email,
          val.company_name,
          'Invoices',
        ]);
      }, 0);
    }

    return data;
  },
);

export default customersDataSelector;
