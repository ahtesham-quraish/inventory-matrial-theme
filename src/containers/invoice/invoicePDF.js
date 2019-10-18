import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './invoiceStyles';
import logo from '../../assets/img/logo.png';
import TextField from '@material-ui/core/TextField';

class InvoicePDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountPercentage: 10,
    };
  }
  getSubTotal = () => {
    let subtotal = 0;
    let oldValue = 0;
    let elem = document.getElementById('subTotal');
    if (elem !== null) {
      oldValue = elem.value;
    }
    this.props.qoutationProducts.forEach((element) => {
      // debugger
      subtotal += Number(element.qoutedPrice) * element.requiredQty;
    });
    if (subtotal !== Number(oldValue)) {
      this.props.handleTotalChanges('subTotal', subtotal);
    }
    return subtotal;
  };
  getGrandTotal = () => {
    let subtotal = 0;
    let oldValue = 0;
    let elem = document.getElementById('grandTotal');
    if (elem !== null) {
      oldValue = elem.value;
    }
    this.props.qoutationProducts.forEach((element) => {
      subtotal += Number(element.qoutedPrice) * element.requiredQty;
    });
    let factor = (this.props.invoicePDFInputs.discount / 100) * subtotal;
    if (subtotal - factor !== Number(oldValue)) {
      this.props.handleTotalChanges('grandTotal', subtotal - factor);
    }
    return subtotal - factor;
  };

  getProductName = (product) => {
    const name = ['api', 'title', 'sae'];
    let newName = '';
    name.forEach((n) => {
      newName =
        product[n] && product[n] != ''
          ? newName !== ''
            ? `${newName} - ${product[n]}`
            : `${product[n]}`
          : newName;
    });
    return newName;
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.main}>
          <div className={classes.outerContainerClass}>
            <div className={`${classes.row}`}>
              <div className={`${classes.leftClass} ${classes.colmd6}`}>
                <div className={`${classes.row}`}>
                  <div
                    className={`${classes.logoClass} ${classes.logoimgClass} ${
                      classes.colmd5
                    }`}
                  >
                    <img
                      className={`${classes.imglogo}`}
                      alt="Bootstrap Image Preview"
                      src={logo}
                    />
                  </div>
                  <div
                    className={`${classes.companyAddressClass} ${
                      classes.twoColumnsClass
                    } ${classes.colmd7}`}
                  >
                    <dl>
                      <dt className={classes.companyAddressdtClass}>
                        Faisalabad :
                      </dt>
                      <dd>
                        Street #3, Burhan Center, 98, 2nd Floor, Gulistan
                        Markey, Reilway Road.
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Tel : (0300-7639707)
                        </span>
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Email : farooqitech@gmail.com
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className={`${classes.row}`}>
                  <div className={`${classes.colmd12}`}>
                    <span className={classes.incomeTexClass}>
                      {' '}
                      Sales Tex Registration No : 042-232-22224212-12{' '}
                    </span>
                    <span className={classes.incomeTexClass}>
                      National Tex Number : 12-1243343-124-2
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${classes.rightClass} ${classes.colmd6}`}>
                <div className={classes.cusDivClass}>
                  <span className={classes.cusAddLeftClass}>
                    Buyer's Name & Address
                  </span>
                  <span className={classes.cusAddRightClass}>
                    A Sales Tex Invoice.
                  </span>
                </div>
                {this.props.customer && (
                  <div className={`${classes.row}`}>
                    <div
                      className={`${classes.cusDetailClass}  ${
                        classes.colmd12
                      }`}
                    >
                      <span>
                        {' '}
                        {this.props.customer
                          ? this.props.customer.fName +
                            ' ' +
                            this.props.customer.lName
                          : ''}{' '}
                        <br />
                        {this.props.customer
                          ? this.props.customer.Address1
                          : ''}
                      </span>
                      <span className={`${classes.normalLabelClass}`}>
                        Sale Tex Registration No : {this.props.customer.gst}
                      </span>
                      <span className={`${classes.normalLabelClass}`}>
                        Nationl Tex No : {this.props.customer.ntn}
                      </span>
                      <span className={`${classes.normalLabelClass}`}>
                        City : {this.props.customer.city}
                      </span>
                      <span className={classes.testClass}>
                        Country : {this.props.customer.country}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.twoColumnsClass}>
              <div className={classes.twoColumnsColumnClass}>
                <table className={classes.twoColumnstableClass}>
                  <tr>
                    <th className={classes.twoColumnsthClass}>
                      Buyer's Order Number
                    </th>
                    <th className={classes.twoColumnsthClass}>DATE</th>
                  </tr>
                  <tr>
                    <td className={classes.tdElement}>
                      <input
                        className={classes.customInput}
                        value={this.props.invoicePDFInputs.buyerOrderNumber}
                        id={'buyerOrderNumber'}
                        onChange={this.props.handleInvoiceChange}
                      />
                    </td>
                    <td className={classes.tdElement}>
                      <TextField
                        id="buyerOrderNumberDate"
                        label=""
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.props.handleInvoiceChange}
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <div className={classes.twoColumnsColumnClass}>
                <table
                  style={{ width: '100%' }}
                  className={classes.twoColumnstableClass}
                >
                  <tr>
                    <th className={classes.twoColumnsthClass}>
                      BILL & SALES TAX INVOICE NO
                    </th>
                    <th className={classes.twoColumnsthClass}>DATE</th>
                  </tr>
                  <tr>
                    <td className={classes.tdElement}>
                      {' '}
                      <input
                        className={classes.customInput}
                        value={this.props.invoicePDFInputs.taxInvoiceNumber}
                        id={'taxInvoiceNumber'}
                        onChange={this.props.handleInvoiceChange}
                      />
                    </td>
                    <td className={classes.tdElement}>
                      <TextField
                        id="taxInvoiceNumberDate"
                        label=""
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.props.handleInvoiceChange}
                      />
                    </td>
                  </tr>
        
                </table>
              </div>
            </div>
            <div className={classes.oneColumnClass}>
              <table
                style={{ width: '100%' }}
                classes={classes.oneColumntableClass}
              >
                <thead classes={classes.theadElement}>
                  <tr className={classes.trElement}>
                    <th className={classes.oneColumnthClass}>Sr#</th>
                    <th className={classes.oneColumnthClass}>
                      Cust Description
                    </th>
                    <th className={classes.oneColumnthClass}>Product</th>
                    <th
                      className={`${classes.oneColumnthClass} ${
                        classes.thElement
                      }`}
                    >
                      Brand
                    </th>
                    <th
                      className={`${classes.oneColumnthClass} ${
                        classes.thElement
                      }`}
                    >
                      Qty
                    </th>
                    <th
                      className={`${classes.oneColumnthClass} ${
                        classes.thElement
                      }`}
                    >
                      Price(PKR)
                    </th>
                    <th
                      className={`${classes.oneColumnthClass} ${
                        classes.thElement
                      }`}
                    >
                      Status
                    </th>
                    <th
                      className={`${classes.oneColumnthClass} ${
                        classes.thElement
                      }`}
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.tbodyElement}>
                  {this.props.qoutationProducts.map((product, key) => (
                    <tr className={classes.trElement}>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {key + 1}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.custDescription}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {this.getProductName(product)}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.brand}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.requiredQty}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.qoutedPrice}
                      </td>

                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        Ok
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        <input className={classes.removeBg} />
                      </td>
                    </tr>
                  ))}

                  <tr className={classes.oneColumntrLasttdClass}>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td
                      className={`${classes.alignRight} ${classes.paddingTop}`}
                    >
                      <span>Sub Total:</span>
                    </td>
                    <td>
                      <input
                        id="subTotal"
                        value={this.getSubTotal()}
                        className={classes.noBorder}
                        onChange={this.props.handleInvoiceChange}
                        // disabled
                      />
                    </td>
                  </tr>
                  <tr className={classes.oneColumntrLasttdClass}>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td className={classes.alignRight}>
                      <span>Discount:</span>
                    </td>
                    <td>
                      <input
                        id="discount"
                        onChange={this.props.handleInvoiceChange}
                        className={classes.noBorder}
                        value={this.props.invoicePDFInputs.discount}
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${classes.oneColumntrLasttdClass} ${
                      classes.oneColumntrLastGrandtdClass
                    }`}
                  >
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td className={classes.alignRight}>
                      <span className={classes.oneColumntrLasttdspanClass}>
                        Grand Total:
                      </span>
                    </td>
                    <td>
                      <input
                        id="grandTotal"
                        onChange={this.props.handleInvoiceChange}
                        className={classes.noBorder}
                        value={this.getGrandTotal()}
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={classes.signatureBlockClass}>
                <span className={classes.signatureBlockNameClass}>
                  Manager's Signature:
                </span>
                <span className={classes.signatureBlockSignatureClass} />
              </div>
            </div>
          </div>
          <div className={`${classes.footerClass} ${classes.commanClass}`}>
            <div className={classes.commanLeftClass}>
              {' '}
              <img className={classes.commonLogoClass} src={logo} />
            </div>
            <div className={classes.commanRightClass}>
              {' '}
              <span className={classes.commanRightSpanClass}>
                Abaco Techinal Provate Limited
              </span>
              <div className={classes.authDivClass}>
                {' '}
                Authorized Distributor{' '}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
InvoicePDF = withStyles(styles)(InvoicePDF);
export default InvoicePDF;
