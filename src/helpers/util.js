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

export const expensesTableDate = (transactions, dateFilter) => {
  let tempData = [];
  let readyData = [];
  let Belence = 0;
  for (let trans in transactions) {
    if (transactions[trans].type === 'Money Out') {
      tempData = [];
      tempData.push(transactions[trans].category.code);
      tempData.push(transactions[trans].category.name);
      tempData.push('Rs' + transactions[trans].amount);
      Belence = parseInt(Belence) + parseInt(transactions[trans].amount);
      readyData.push(tempData);
    }
  }
  if (readyData.length > 0) {
    tempData = [];
    tempData.push('');
    tempData.push('Total Expense');
    tempData.push('RS' + Belence);
    readyData.push(tempData);
  }
  return { readyData, Belence };
};

export const prepareBankTableData = (transactions, dateFilter) => {
  const DateObject = new Date(dateFilter);
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  if (transactions) {
    for (let trans in transactions) {
      if (dateFilter) {
        if (new Date(transactions[trans].date) <= DateObject) {
          if (!detailObject[transactions[trans].bank_account.id]) {
            detailObject[transactions[trans].bank_account.id] = [
              transactions[trans],
            ];
          } else {
            detailObject[transactions[trans].bank_account.id].push(
              transactions[trans],
            );
          }
        }
      } else {
        if (!detailObject[transactions[trans].bank_account.id]) {
          detailObject[transactions[trans].bank_account.id] = [
            transactions[trans],
          ];
        } else {
          detailObject[transactions[trans].bank_account.id].push(
            transactions[trans],
          );
        }
      }
    }
  }

  let Belence = 0;
  let total = 0;
  let banks = {};
  for (let detail in detailObject) {
    const TransactionArray = detailObject[detail];
    tempData = [];
    Belence = 0;
    TransactionArray.forEach((element) => {
      tempData = [];
      if (element.type === 'Customer Receipt') {
        tempData = [];
        Belence = parseInt(Belence) + parseInt(element.amount);
        tempData.push(element.date);
        tempData.push(element.id);
        tempData.push(element.type);
        tempData.push(element.description);
        tempData.push('Rs' + element.amount);
        tempData.push('');
        tempData.push('Rs' + Belence);
        readyData.push(tempData);
      }

      tempData = [];
      if (element.type === 'Supplier Payment') {
        tempData = [];
        Belence = parseInt(Belence) - parseInt(element.amount);
        tempData.push(element.date);
        tempData.push(element.id);
        tempData.push(element.type);
        tempData.push(element.description);
        tempData.push('');
        tempData.push('Rs' + element.amount);
        tempData.push('Rs' + Belence);
        readyData.push(tempData);
      }

      if (element.type === 'Money Out') {
        Belence = parseInt(Belence) - parseInt(element.amount);
        tempData = [];
        tempData.push(element.date);
        tempData.push(element.id);
        tempData.push(element.type);
        tempData.push(element.description);
        tempData.push('');
        tempData.push('Rs' + element.amount);
        tempData.push('Rs' + Belence);

        readyData.push(tempData);
      }
      if (element.type === 'Money In') {
        Belence = parseInt(Belence) + parseInt(element.amount);
        tempData = [];
        tempData.push(element.date);
        tempData.push(element.id);
        tempData.push(element.type);
        tempData.push(element.description);
        tempData.push('Rs' + element.amount);
        tempData.push('');
        tempData.push('Rs' + Belence);
        readyData.push(tempData);
      }
    });
    banks[detailObject[detail][0].bank_account.name] = {
      readyData,
      Belence,
      code: detailObject[detail][0].bank_account.code,
    };
    readyData = [];
    Belence = 0;
  }
  // if (parseInt(Belence) !== 0) {
  //   tempData.push(
  //     `${detailObject[detail][0].bank.name} ${
  //     }`,
  //   );
  //   total = parseInt(total) + parseInt(Belence);
  //   tempData.push('Rs' + Belence);
  //   readyData.push(tempData);
  // }

  // tempData = [];
  // tempData.push('Total Belence ');
  // tempData.push('Rs' + total);
  // readyData.push(tempData);

  return { banks, Belence: total };
};
