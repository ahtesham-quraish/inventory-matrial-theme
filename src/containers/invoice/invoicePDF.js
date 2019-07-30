import React from 'react';
// import '../../assets/css/style.css';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './invoiceStyles';
import logo from '../../assets/img/logo.png';

class InvoicePDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountPercentage: 10,
    };
  }
  getSubTotal = () => {
    let subtotal = 0;
    this.props.qoutationProducts.forEach((element) => {
      console.log('element in sub total', element);
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
  render() {
    const { classes } = this.props;
    console.log(this.props.qoutationProducts);
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
                        53 Street Number Barkat Market Mandi Bazar Faisalabad.
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Tel : (042 4343432)
                        </span>
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Email : ahtesham.quraish@gmail.com
                        </span>
                      </dd>
                      <dt className={classes.companyAddressdtClass}>
                        Lahore :
                      </dt>
                      <dd>
                        Stree No 12 Office No 3 Modal town near farrozpur Road
                        Lahore.
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Tel : (042 4343432)
                        </span>
                        <span className={`${classes.normalLabelClass}`}>
                          {' '}
                          Email : ahtesham.quraish@gmail.com
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
                <div className={`${classes.row}`}>
                  <div
                    className={`${classes.cusDetailClass}  ${classes.colmd12}`}
                  >
                    <span>
                      {' '}
                      {this.props.customer
                        ? this.props.customer.fName +
                          ' ' +
                          this.props.customer.lName
                        : ''}{' '}
                      <br />
                      {this.props.customer ? this.props.customer.Address1 : ''}
                    </span>
                    <span className={`${classes.normalLabelClass}`}>
                      Sale Tex Registration No : 2323434312-3434
                    </span>
                    <span className={`${classes.normalLabelClass}`}>
                      Nationl Tex No : 2323243431-23
                    </span>
                    <span className={`${classes.normalLabelClass}`}>
                      City : FAISLABAD
                    </span>
                    <span className={classes.testClass}>
                      Country : PAKISTAN
                    </span>
                  </div>
                </div>
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
                    <td className={classes.tdElement}>23232545-34232</td>
                    <td className={classes.tdElement}>12/1/2009</td>
                  </tr>
                  <tr>
                    <th className={classes.tdElement}>DIVLIVERY/CHALLAN NO</th>
                    <th className={classes.tdElement}>DATE</th>
                  </tr>
                  <tr>
                    <td className={classes.tdElement}>f121434343</td>
                    <td className={classes.tdElement}>12/12/2009</td>
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
                    <td className={classes.tdElement}>f12132323</td>
                    <td className={classes.tdElement}>12/34/2009</td>
                  </tr>
                  <tr>
                    <th className={classes.tdElement}>OUR ORD.ACK./QOUT.NO</th>
                    <th className={classes.tdElement}>DATE</th>
                  </tr>
                  <tr>
                    <td className={classes.tdElement}>f23231212</td>
                    <td className={classes.tdElement}>12/1/1001</td>
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
                    <th className={classes.oneColumnthClass}>
                      Item Description
                    </th>
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
                      U Price
                    </th>
                    <th
                      className={`${classes.oneColumnthClass} ${
                        classes.thElement
                      }`}
                    >
                      Delivery Time
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
                    />
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
                        {product.description}
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
                        Ready Stock
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
                      />
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
                    <td>{this.getSubTotal()}</td>
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
                    <td>{this.state.discountPercentage + '%'}</td>
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
                    <td>{this.getGrandTotal()}</td>
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
