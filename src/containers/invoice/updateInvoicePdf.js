import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './invoiceStyles';
import logo from '../../assets/img/logo.png';
import TextField from '@material-ui/core/TextField';

class UpdateInvoicePDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountPercentage: 10,
    };
  }
  getSubTotal = () => {
    let subtotal = 0;
    this.props.qoutationProducts.forEach((element) => {
      subtotal += element.price * element.requiredQty;
    });
    return subtotal;
  };
  getGrandTotal = () => {
    let subtotal = 0;
    this.props.qoutationProducts.forEach((element) => {
      subtotal += element.price * element.requiredQty;
    });
    let factor = (this.state.discountPercentage / 100) * subtotal;
    return subtotal - factor;
  };
  componentWillUpdate = () => {
    console.log('invoice products are ', this.props.qoutationProducts);
    console.log('invoice cust is ', this.props.customer);
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
  processDate = (date) => {
    let newDate = date.split('T');
    return newDate[0];
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

                      <dt className={classes.companyAddressdtClass}>
                        Reg Off :
                      </dt>
                      <dd>
                        Ghanta Gher bazar Mall Road Faisalabad.
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Tel : (042 4343432)
                        </span>
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Email : ahtesham.quraish@gmail.com
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
                {this.props.invoiceByID.invoice.customer && (
                  <div className={`${classes.row}`}>
                    <div
                      className={`${classes.cusDetailClass}  ${
                        classes.colmd12
                      }`}
                    >
                      <span>
                        {' '}
                        {this.props.customer
                          ? this.props.invoiceByID.invoice.customer.fName +
                            ' ' +
                            this.props.invoiceByID.invoice.customer.lName
                          : ''}{' '}
                        <br />
                        {this.props.customer
                          ? this.props.invoiceByID.invoice.customer.Address1
                          : ''}
                      </span>
                      <span className={`${classes.normalLabelClass}`}>
                        Sale Tex Registration No :{' '}
                        {this.props.invoiceByID.invoice.customer.gst}
                      </span>
                      <span className={`${classes.normalLabelClass}`}>
                        Nationl Tex No :{' '}
                        {this.props.invoiceByID.invoice.customer.ntn}
                      </span>
                      <span className={`${classes.normalLabelClass}`}>
                        City : {this.props.invoiceByID.invoice.customer.city}
                      </span>
                      <span className={classes.testClass}>
                        Country :{' '}
                        {this.props.invoiceByID.invoice.customer.country}
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
                        value={this.props.invoiceByID.invoice.buyerOrderNumber}
                        id={'buyerOrderNumber'}
                        onChange={this.props.handleInvoiceChange}
                      />
                    </td>
                    <td className={classes.tdElement}>
                      <TextField
                        id="buyerOrderNumberDate"
                        label=""
                        type="text"
                        value={this.processDate(
                          this.props.invoiceByID.invoice.deliverNumberDate,
                        )}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.props.handleInvoiceChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tdElement}>DIVLIVERY/CHALLAN NO</th>
                    <th className={classes.tdElement}>DATE</th>
                  </tr>
                  <tr>
                    <td className={classes.tdElement}>
                      {' '}
                      <input
                        className={classes.customInput}
                        value={this.props.invoiceByID.invoice.deliverNumber}
                        id={'deliverNumber'}
                      />
                    </td>
                    <td className={classes.tdElement}>
                      <TextField
                        id="deliverNumberDate"
                        label=""
                        type="text"
                        value={this.processDate(
                          this.props.invoiceByID.invoice.deliverNumberDate,
                        )}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        value={this.props.invoiceByID.invoice.taxInvoiceNumber}
                        id={'taxInvoiceNumber'}
                      />
                    </td>
                    <td className={classes.tdElement}>
                      <TextField
                        id="taxInvoiceNumberDate"
                        label=""
                        type="text"
                        value={this.processDate(
                          this.props.invoiceByID.invoice.taxInvoiceNumberDate,
                        )}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tdElement}>OUR ORD.ACK./QOUT.NO</th>
                    <th className={classes.tdElement}>DATE</th>
                  </tr>
                  <tr>
                    <td className={classes.tdElement}>
                      {' '}
                      <input
                        className={classes.customInput}
                        value={this.props.invoiceByID.invoice.qoutNumber}
                        id={'qoutNumber'}
                      />
                    </td>
                    <td className={classes.tdElement}>
                      <TextField
                        id="qoutNumberDate"
                        label=""
                        type="text"
                        value={this.processDate(
                          this.props.invoiceByID.invoice.qoutNumberDate,
                        )}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                  </tr>
                </thead>
                <tbody className={classes.tbodyElement}>
                  {this.props.invoiceByID.products.map((product, key) => (
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
                        {product.customerDescription}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {this.getProductName(product.product)}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.product.brand}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.quatityOffered}
                      </td>
                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        {product.overiddenPrice}
                      </td>

                      <td
                        className={`${classes.oneColumntdClass} ${
                          classes.tdElement
                        }`}
                      >
                        Ok
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
                    <td />
                    <td>
                      <span>Sub Total:</span>
                    </td>
                    <td>{this.props.invoiceByID.invoice.subTotal}</td>
                  </tr>
                  <tr className={classes.oneColumntrLasttdClass}>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <span>Discount:</span>
                    </td>
                    <td>{this.props.invoiceByID.invoice.discount}</td>
                  </tr>
                  <tr
                    className={`$classes.oneColumntrLasttdClass ${
                      classes.oneColumntrLastGrandtdClass
                    }`}
                  >
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <span className={classes.oneColumntrLasttdspanClass}>
                        Grand Total:
                      </span>
                    </td>
                    <td>{this.props.invoiceByID.invoice.grandTotal}</td>
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
UpdateInvoicePDF = withStyles(styles)(UpdateInvoicePDF);
export default UpdateInvoicePDF;
