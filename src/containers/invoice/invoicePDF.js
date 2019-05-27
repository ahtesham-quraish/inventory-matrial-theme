import React from 'react';
import { connect } from 'react-redux';
import '../../assets/css/style.css';
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
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="outer-container">
            <div className="">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6 left">
                    <div className="row">
                      <div className="col-md-5 logo">
                        <img alt="Bootstrap Image Preview" src={logo} />
                        <p>Bearing Industry Faisalabad</p>
                      </div>
                      <div className="col-md-7 company-address">
                        <dl>
                          <dt>Faisalabad :</dt>
                          <dd>
                            53 Street Number Barkat Market Mandi Bazar
                            Faisalabad.
                            <span className="normal-label">
                              {' '}
                              Tel : (042 4343432)
                            </span>
                            <span className="normal-label">
                              {' '}
                              Email : ahtesham.quraish@gmail.com
                            </span>
                          </dd>
                          <dt>Lahore :</dt>
                          <dd>
                            Stree No 12 Office No 3 Modal town near farrozpur
                            Road Lahore.
                            <span className="normal-label">
                              {' '}
                              Tel : (042 4343432)
                            </span>
                            <span className="normal-label">
                              {' '}
                              Email : ahtesham.quraish@gmail.com
                            </span>
                          </dd>

                          <dt>Reg Off :</dt>
                          <dd>
                            Ghanta Gher bazar Mall Road Faisalabad.
                            <span className="normal-label">
                              {' '}
                              Tel : (042 4343432)
                            </span>
                            <span className="normal-label">
                              {' '}
                              Email : ahtesham.quraish@gmail.com
                            </span>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <span className="income-tex">
                          {' '}
                          Sales Tex Registration No : 042-232-22224212-12{' '}
                        </span>
                        <span className="income-tex">
                          National Tex Number : 12-1243343-124-2
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 right">
                    <div className="cus-div">
                      <span className="cus-add-left">
                        Buyer's Name & Address
                      </span>
                      <span className="cus-add-right">
                        A Sales Tex Invoice.
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-md-12 cus-detail">
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
                        <span className="normal-label">
                          Sale Tex Registration No : 2323434312-3434
                        </span>
                        <span className="normal-label">
                          Nationl Tex No : 2323243431-23
                        </span>
                        <span className="normal-label">City : FAISLABAD</span>
                        <span className="normal-label">Country : PAKISTAN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="two-columns">
              <div className="column">
                <table>
                  <tr>
                    <th>Buyer's Order Number</th>
                    <th>DATE</th>
                  </tr>
                  <tr>
                    <td>23232545-34232</td>
                    <td>12/1/2009</td>
                  </tr>
                  <tr>
                    <th>DIVLIVERY/CHALLAN NO</th>
                    <th>DATE</th>
                  </tr>
                  <tr>
                    <td>f121434343</td>
                    <td>12/12/2009</td>
                  </tr>
                </table>
              </div>
              <div className="column">
                <table>
                  <tr>
                    <th>BILL & SALES TAX INVOICE NO</th>
                    <th>DATE</th>
                  </tr>
                  <tr>
                    <td>f12132323</td>
                    <td>12/34/2009</td>
                  </tr>
                  <tr>
                    <th>OUR ORD.ACK./QOUT.NO</th>
                    <th>DATE</th>
                  </tr>
                  <tr>
                    <td>f23231212</td>
                    <td>12/1/1001</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="one-column">
              <table>
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Cust Description</th>
                    <th>Item Description</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th>U Price</th>
                    <th>Delivery Time</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.props.qoutationProducts.map((product, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td contenteditable="true" />
                      <td>{product.description}</td>
                      <td>{product.brand}</td>
                      <td>{product.requiredQty}</td>
                      <td>{product.price}</td>
                      <td>Ready Stock</td>
                      <td>Ok</td>
                      <td />
                    </tr>
                  ))}

                  <tr className="last">
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
                  <tr className="last">
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
                  <tr className="last grand">
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <span>Grand Total:</span>
                    </td>
                    <td>{this.getGrandTotal()}</td>
                  </tr>
                </tbody>
              </table>
              <div className="signature-block">
                <span className="name">Manager's Signature:</span>
                <span className="signature" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer comman">
          <div className="comman-left">
            {' '}
            <img className="common-logo" src={logo} />
          </div>
          <div className="comman-right">
            {' '}
            <span className="comman-right-span">
              Abaco Techinal Provate Limited
            </span>
            <div className="auth-div"> Authorized Distributor </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.QoutationReducer.selectedCustomers,
    qoutationProducts: state.QoutationReducer.qoutationProducts,
  };
};

export default connect(
  mapStateToProps,
  null,
)(InvoicePDF);
