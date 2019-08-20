export default function invoicePDFChangeHandler(payload) {
  console.log('action to be dispatched ', payload);
  return (dispatch) => {
    dispatch(payload);
  };
}
