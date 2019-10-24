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
export const getBankDetail = (transactions, bankId) => {
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  let Belence = 0
  if (transactions) {
    for (let trans in transactions) {
      let t = transactions[trans];
      if(t.bank_account.id === bankId){
        tempData = []
        tempData.push(new Date(t.date).toDateString())
        tempData.push(`${t.invoiceId} | ${t.type}`)
        tempData.push(t.customer ? t.customer.company_name : 'N/A');
        tempData.push(t.category ? `${t.category.code} | ${t.category.title} |  ${t.category.name}` : 'N/A');
        tempData.push(t.amount)
        if (t.type === 'Customer Receipt') {
          Belence = parseInt(Belence) - parseInt(t.amount);
          tempData.push("");
          tempData.push('Rs' + t.amount);
          tempData.push('Rs' + Belence);
        }
        if (t.type === 'Customer Invoice') {
          Belence = parseInt(Belence) + parseInt(t.amount);
          tempData.push('Rs' + t.amount);
          tempData.push('');
          tempData.push('Rs' + Belence);
        }
      
        if (t.type === 'Supplier Invoice') {
          Belence = parseInt(Belence) + parseInt(t.amount);
          tempData.push("");
          tempData.push('Rs' + t.amount);
          tempData.push('Rs' + Belence);
        }
        if (t.type === 'Supplier Payment') {
          Belence = parseInt(Belence) - parseInt(t.amount);
          tempData.push('Rs' + t.amount);
          tempData.push("");
          tempData.push('Rs' + Belence);
        }
        if (t.type === 'Money Out') {
          Belence = parseInt(Belence) - parseInt(t.amount);
          tempData.push('');
          tempData.push('Rs'+t.amount);
          tempData.push('Rs' + Belence);
        }
        if (t.type === 'Money In') {
          Belence = parseInt(Belence) + parseInt(t.amount);
          tempData.push('Rs'+t.amount);
          tempData.push("");
          tempData.push('Rs' + Belence);
        }
        readyData.push(tempData);
      }
    }
  }
  return readyData;
}

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

export const getProductDetail = (productId, Invoices) => {
  const proDetail = [];
  let tmp = [];
  Invoices.forEach(invoice => {
    invoice.products.forEach((product) => {
      if(product.product.id === productId){
        tmp = [];
        tmp.push(`${product.product.api}-${product.product.sae}`);
        tmp.push(product.invoice.customer.company_name);
        tmp.push(product.quatityOffered)
        tmp.push(product.overiddenPrice);
        tmp.push(product.invoice.grandTotal);
        tmp.push(product.invoice.status);
        tmp.push(new Date(invoice.dateCreated).toDateString());
        proDetail.push(tmp);
      }
    })
});
console.log(productId, Invoices)
console.log(proDetail);
return proDetail
}

export const customerBelence = (transactions, CustomerType, custTransaction) => {
  const detailObject = {};
  let readyData = [];
  let tempData = [];
  if (custTransaction) {
    for (let trans in custTransaction) {
      if (!detailObject[custTransaction[trans].invoiceId]) {
        detailObject[custTransaction[trans].invoiceId] = [
          custTransaction[trans],
        ];
      } else {
        detailObject[custTransaction[trans].invoiceId].push(
          custTransaction[trans],
        );
      }
    }
  }
  let Belence = 0;
  if (CustomerType === 'Buyer') {
    for (let detail in detailObject) {
      const TransactionArray = detailObject[detail];
      tempData = [];
      TransactionArray.forEach((element) => {
        tempData = [];
        if (element.type === 'Customer Invoice') {
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
      });
      TransactionArray.forEach((element) => {
        tempData = [];
        if (element.type === 'Customer Receipt') {
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
      });
    }
  } else {
    for (let detail in detailObject) {
      const TransactionArray = detailObject[detail];
      tempData = [];
      TransactionArray.forEach((element) => {
        tempData = [];
        if (element.type === 'Supplier Invoice') {
          Belence = parseInt(Belence) + parseInt(element.amount);
          tempData.push(element.date);
          tempData.push(element.id);
          tempData.push(element.type);
          tempData.push(element.description);
          tempData.push('');
          tempData.push('Rs' + element.amount);
          tempData.push('Rs' + Belence);
          readyData.push(tempData);
        }
      });
      TransactionArray.forEach((element) => {
        tempData = [];
        if (element.type === 'Supplier Payment') {
          Belence = parseInt(Belence) - parseInt(element.amount);
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
    }
  }

  tempData = [];
  tempData.push('');
  tempData.push('');
  tempData.push('');
  tempData.push('');
  tempData.push('');
  tempData.push('Belence');
  tempData.push('Rs' + Belence);
  readyData.push(tempData);
  return { readyData, Belence };
};

