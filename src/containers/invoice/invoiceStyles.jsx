const styles = {
  row: { overflow: 'hidden' },
  colmd6: { float: 'left', width: '50%' },
  colmd7: { width: '57%', float: 'left' },
  colmd5: { float: 'left' },
  colmd12: {},
  main: {
    position: 'relative',
    paddingBottom: '100px',
  },
  //.vl
  vlClass: {
    borderLeft: '2px solid #925562',
    marginTop: '15px',
  },
  //.logo
  logoClass: {
    textAlign: 'center',
  },

  //.logo img
  logoimgClass: {
    width: '180px',
    height: '180px',
  },
  imglogo: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
    width: 'auto',
  },
  //.company-address
  companyAddressClass: {
    borderLeft: '2px solid #925562',
    margin: '0 0 10px 15px',
    padding: '0 0 0 15px',
  },
  //.company-address dt
  companyAddressdtClass: {
    float: 'left',
    margin: '0 5px 0 0',
    fontWeight: 'bold',
  },
  //.normal-label
  normalLabelClass: {
    display: 'block',
  },
  //.income-tex
  incomeTexClass: {
    display: 'block',
    textAlign: 'center',
    fontSize: '20px',
    fontStyle: 'bold',
    fontWeight: 'bold',
  },
  //.outer-container
  outerContainerClass: {
    maxWidth: '1170px',
    margin: '20px auto 50px',
    border: '2px solid black',
  },
  //.left
  leftClass: {
    padding: '20px 20px 10px',
    borderRight: '1px solid black',
  },
  //.right
  rightClass: {
    padding: '0 0 0 20px',
  },
  //.cus-add-left
  cusAddLeftClass: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '40%',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  //.cus-add-right
  cusAddRightClass: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '59%',
    textAlign: 'center',
    borderLeft: '3px solid black',
    borderBottom: '3px solid black',
    padding: '10px 0',
    fontSize: '26px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  //.cus-div
  cusDivClass: {
    marginRight: '-17px',
  },
  //.cus-detail
  cusDetailClass: {
    marginTop: '40px',
    marginLeft: '22px',
    fontWeight: 'bold',
    fontSize: '15px',
    maxWidth: '400px',
  },
  //.two-columns
  twoColumnsClass: {
    overflow: 'hidden',
  },
  //.two-columns .column
  twoColumnsColumnClass: {
    float: 'left',
    width: '50%',
  },
  //.two-columns table
  twoColumnstableClass: {
    width: '100%',
  },
  //.two-columns th, td
  twoColumnsthClass: {
    border: '1px solid #000',
    padding: '10px',
    verticalAlign: 'middle',
    width: '70%',
  },
  tdElement: {
    border: '1px solid #000',
    padding: '10px',
    verticalAlign: 'middle',
    width: '70%',
  },
  //.one-column
  oneColumnClass: {
    margin: '0 0 28px',
  },
  //.one-column table, caption, tbody, tfoot, thead, tr, th, td
  oneColumntableClass: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  captionElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  tbodyElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  tfootElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  theadElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  trElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  thElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  // tdElement: {
  //   borderCollapse: 'collapse',
  //   borderSpacing: '0',
  //   width: '100%',
  // },
  //.one-column th, .one-column td
  oneColumnthClass: {
    border: '1px solid #000',
    padding: '15px 7px',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 'auto',
  },
  oneColumntdClass: {
    border: '1px solid #000',
    padding: '15px 7px',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 'auto',
  },
  //.one-column tr.last td
  oneColumntrLasttdClass: {
    fontSize: '20px',
    lineHeight: '25px',
    border: '0',
    padding: '20px 10px 0',
    textAlign: 'left',
  },
  //.one-column tr.last.grand td
  oneColumntrLastGrandtdClass: {
    fontSize: '25px',
    lineHeight: '30px',
    fontWeight: 'bold',
    border: '0',
  },
  //.one-column tr.last td span
  oneColumntrLasttdspanClass: {
    display: 'block',
    width: '150px',
  },
  //.signature-block
  signatureBlockClass: {
    overflow: 'hidden',
    margin: '-25px 0 0 21px',
  },
  //.signature-block .name
  signatureBlockNameClass: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    margin: '0 10px 0 0',
  },
  //.signature-block .signature
  signatureBlockSignatureClass: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    borderBottom: '1px solid #000',
    width: '300px',
  },
  //.footer
  footerClass: {
    margin: '0 auto',
    maxWidth: '1170px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    right: '0',
  },
  //.comman
  commanClass: {
    overflow: 'hidden',
  },
  //.comman-left
  commanLeftClass: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100px',
  },
  //.comman-right
  commanRightClass: {
    display: 'inline-block',
    verticalAlign: 'middle',
    background: '#97ccef',
    width: '91%',
    paddingLeft: '19px',
    paddingTop: '8px',
    borderRadius: '10px',
    border: '1px solid blue',
  },
  //.comman-right-span
  commanRightSpanClass: {
    padding: '0 0 5px 36px',
  },
  customInput: {
    display: 'block',
    width: '100%',
    padding: '5px 5px',
    border: 'none',
    backgroundColor: 'inherit',
  },
  //.auth-div
  authDivClass: {
    background: '#025aa5',
    borderTopLeftRadius: '59px',
    padding: '11px 1px 5px 35px',
    Height: '100%',
    MarginLeft: '0px',
  },
  //.common-logo
  commonLogoClass: {
    width: '100px',
  },
  [`@media print`]: {
    footerClass: {
      position: 'fixed',
      bottom: '10px',
    },
    main: {
      padding: '0 20px',
    },
  },
};

export default styles;
