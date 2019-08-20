export const prepareReceivableTableData = (transactions, dateFilter) => {
  const DateObject = new Date(dateFilter);
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  if (transactions) {
    for (let trans in transactions) {
      if (dateFilter) {
        if (new Date(transactions[trans].date) <= DateObject) {
          if (!detailObject[transactions[trans].invoiceId]) {
            detailObject[transactions[trans].invoiceId] = [transactions[trans]];
          } else {
            detailObject[transactions[trans].invoiceId].push(
              transactions[trans],
            );
          }
        }
      } else {
        if (!detailObject[transactions[trans].invoiceId]) {
          detailObject[transactions[trans].invoiceId] = [transactions[trans]];
        } else {
          detailObject[transactions[trans].invoiceId].push(transactions[trans]);
        }
      }
    }
  }

  let Belence = 0;
  let total = 0;
  for (let detail in detailObject) {
    const TransactionArray = detailObject[detail];
    tempData = [];
    Belence = 0;
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Customer Invoice') {
        Belence = parseInt(Belence) + parseInt(element.amount);
      }
    });
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Customer Receipt') {
        Belence = parseInt(Belence) - parseInt(element.amount);
      }
    });
    if (parseInt(Belence) !== 0) {
      tempData.push(
        `${detailObject[detail][0].customer.fName} ${
          detailObject[detail][0].customer.lName
        }`,
      );
      total = parseInt(total) + parseInt(Belence);
      tempData.push('Rs' + Belence);
      readyData.push(tempData);
    }
  }
  tempData = [];
  tempData.push('Total Belence ');
  tempData.push('Rs' + total);
  readyData.push(tempData);
  return { readyData, Belence: total };
};
export const prepareSaleTableData = (transactions, dateFilter) => {
  const DateObject = new Date(dateFilter);
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  if (transactions) {
    for (let trans in transactions) {
      if (dateFilter) {
        if (new Date(transactions[trans].date) <= DateObject) {
          if (!detailObject[transactions[trans].invoiceId]) {
            detailObject[transactions[trans].invoiceId] = [transactions[trans]];
          } else {
            detailObject[transactions[trans].invoiceId].push(
              transactions[trans],
            );
          }
        }
      } else {
        if (!detailObject[transactions[trans].invoiceId]) {
          detailObject[transactions[trans].invoiceId] = [transactions[trans]];
        } else {
          detailObject[transactions[trans].invoiceId].push(transactions[trans]);
        }
      }
    }
  }

  let Belence = 0;
  for (let detail in detailObject) {
    const TransactionArray = detailObject[detail];
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Customer Invoice') {
        Belence = parseInt(Belence) + parseInt(element.amount);
      }
    });
  }
  tempData = [];
  tempData.push('400');
  tempData.push('Sale');
  tempData.push('Rs' + Belence);
  readyData.push(tempData);
  return { readyData, Belence };
};
export const preparePurchaseTableData = (transactions, dateFilter) => {
  const DateObject = new Date(dateFilter);
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  if (transactions) {
    for (let trans in transactions) {
      if (dateFilter) {
        if (new Date(transactions[trans].date) <= DateObject) {
          if (!detailObject[transactions[trans].invoiceId]) {
            detailObject[transactions[trans].invoiceId] = [transactions[trans]];
          } else {
            detailObject[transactions[trans].invoiceId].push(
              transactions[trans],
            );
          }
        }
      } else {
        if (!detailObject[transactions[trans].invoiceId]) {
          detailObject[transactions[trans].invoiceId] = [transactions[trans]];
        } else {
          detailObject[transactions[trans].invoiceId].push(transactions[trans]);
        }
      }
    }
  }

  let Belence = 0;
  let total = 0;
  for (let detail in detailObject) {
    const TransactionArray = detailObject[detail];
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Supplier Invoice') {
        Belence = parseInt(Belence) + parseInt(element.amount);
      }
    });
  }
  tempData = [];
  tempData.push('00');
  tempData.push('Purchase');
  tempData.push('Rs' + Belence);
  readyData.push(tempData);

  return { readyData, Belence };
};
export const preparePayableTableData = (transactions, dateFilter) => {
  const DateObject = new Date(dateFilter);
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  if (transactions) {
    for (let trans in transactions) {
      if (dateFilter) {
        if (new Date(transactions[trans].date) <= DateObject) {
          if (!detailObject[transactions[trans].invoiceId]) {
            detailObject[transactions[trans].invoiceId] = [transactions[trans]];
          } else {
            detailObject[transactions[trans].invoiceId].push(
              transactions[trans],
            );
          }
        }
      } else {
        if (!detailObject[transactions[trans].invoiceId]) {
          detailObject[transactions[trans].invoiceId] = [transactions[trans]];
        } else {
          detailObject[transactions[trans].invoiceId].push(transactions[trans]);
        }
      }
    }
  }

  let Belence = 0;
  let total = 0;
  for (let detail in detailObject) {
    const TransactionArray = detailObject[detail];
    tempData = [];
    Belence = 0;
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Supplier Invoice') {
        Belence = parseInt(Belence) + parseInt(element.amount);
      }
    });
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Supplier Payment') {
        Belence = parseInt(Belence) - parseInt(element.amount);
      }
    });
    if (parseInt(Belence) !== 0) {
      tempData.push(
        `${detailObject[detail][0].customer.fName} ${
          detailObject[detail][0].customer.lName
        }`,
      );
      total = parseInt(total) + parseInt(Belence);
      tempData.push('Rs' + Belence);
      readyData.push(tempData);
    }
  }
  tempData = [];
  tempData.push('Total Belence ');
  tempData.push('Rs' + total);
  readyData.push(tempData);

  return { readyData, Belence: total };
};
