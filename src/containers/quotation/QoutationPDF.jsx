import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from '../../assets/img/logo.png';
import styles from '../../assets/jss/material-dashboard-react/components/pdf';

class QuotationPDF extends React.Component {
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
    const { classes } = this.props;
    return (
      <div id="wrapper" className={classes.divider}>
        <div className={classes.quotationBlockClass}>
          <div className={classes.quotationBlockHeaderSectionClass}>
            <div className={classes.headerSectionLeftColClass}>
              <h1 className={classes.headerSectionLeftColh1Class}>
                Abco Technical (Pvt.) Ltd.
              </h1>
              <dl>
                <dt className={classes.headerSectionLeftColdldtClass}>
                  Address:
                </dt>
                <dd className={classes.headerSectionLeftColdlddClass}>
                  Thokar, Lahore
                </dd>
                <dt className={classes.headerSectionLeftColdldtClass}>
                  Phone:
                </dt>
                <dd className={classes.headerSectionLeftColdlddClass}>
                  +92 331 5677422
                </dd>
                <dt className={classes.headerSectionLeftColdldtClass}>NTN#:</dt>
                <dd className={classes.headerSectionLeftColdlddClass}>
                  01-2344566-34
                </dd>
                <dt className={classes.headerSectionLeftColdldtClass}>
                  Sale Tax Reg No:
                </dt>
                <dd className={classes.headerSectionLeftColdlddClass}>
                  3234234324-242343-324
                </dd>
              </dl>
            </div>
            <div className={classes.headerSectionRightColClass}>
              <div className="logo">
                <img
                  className={classes.headerSectionRightColimgClass}
                  src={logo}
                  alt="logo"
                />
              </div>
            </div>
            <span className={classes.quotationBlockHeaderSectionTitleClass}>
              Quotation
            </span>
          </div>
          <div className={classes.infoBlockClass}>
            <div className={classes.infoBlockBioBlockClass}>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="book">
                  Book :
                </label>
                <input
                  type="text"
                  id="book"
                  className={classes.bioBlockFieldinputDisabledClass}
                  placeholder="Quotation - LHR"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="doc">
                  Doc Date :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="doc"
                  placeholder="22-09-17"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="ref">
                  Qut Ref No :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="ref"
                  placeholder="FRW-322-34"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="dc">
                  Doc No :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="dc"
                  placeholder="313"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="ref1">
                  Your Ref No :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="ref1"
                  placeholder="Email"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="sales">
                  Sales Person :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="sales"
                  placeholder="Farooq"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="date">
                  Due Date :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="date"
                  placeholder="22-09-17"
                  disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="attn">
                  ATTN :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="attn"
                  placeholder="Manager"
                  // disabled
                />
              </div>
              <div className={classes.bioBlockFieldClass}>
                <label className={classes.bioBlockFieldlabelClass} for="valid">
                  Valid Upto Date :
                </label>
                <input
                  className={classes.bioBlockFieldinputDisabledClass}
                  type="text"
                  id="valid"
                  placeholder=""
                  disabled
                />
              </div>
              <div
                className={`${classes.bioBlockFieldClass} ${
                  classes.bioBlockFieldLargeClass
                }`}
              >
                <label
                  className={classes.bioBlockFieldlabelClass}
                  for="customer"
                >
                  Customer :
                </label>
                <input
                  type="text"
                  id="customer"
                  placeholder=""
                  value={
                    this.props.customer
                      ? this.props.customer.fName +
                        ' ' +
                        this.props.customer.lName
                      : ''
                  }
                  disabled
                  className={`${classes.bioBlockFieldinputDisabledClass} ${
                    classes.bioBlockFieldLargeinputDisabledClass
                  }`}
                />
              </div>
              <div
                className={`${classes.bioBlockFieldClass} ${
                  classes.bioBlockFieldLargeClass
                }`}
              >
                <label
                  className={classes.bioBlockFieldlabelClass}
                  for="customer"
                >
                  Address :
                </label>
                <input
                  type="text"
                  id="customer"
                  placeholder=""
                  value={
                    this.props.customer ? this.props.customer.Address1 : ''
                  }
                  disabled
                  className={`${classes.bioBlockFieldinputDisabledClass} ${
                    classes.bioBlockFieldLargeinputDisabledClass
                  }`}
                />
              </div>
              <div
                className={`${classes.bioBlockFieldClass} ${
                  classes.bioBlockFieldLargeClass
                }`}
              >
                <label
                  className={classes.bioBlockFieldlabelClass}
                  for="remarks"
                >
                  Remarks :
                </label>
                <input
                  className={`${classes.bioBlockFieldinputDisabledClass} ${
                    classes.bioBlockFieldLargeinputDisabledClass
                  }`}
                  type="text"
                  id="remarks"
                  placeholder=" "
                  // disabled
                />
              </div>
            </div>
            <table className={`${classes.tableElement}`}>
              <thead className={`${classes.tableElement}`}>
                <tr>
                  <th
                    className={`${classes.tableElement}   ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Sr#
                  </th>
                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Product Name
                  </th>
                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Item Description
                  </th>
                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Cust Description
                  </th>
                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Brand
                  </th>
                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Qty
                  </th>
                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    U Price
                  </th>
                  <th
                    className={`${classes.tableElement}    ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Delivery Time
                  </th>

                  <th
                    className={`${classes.tableElement}  ${
                      classes.infoBlockthClass
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.qoutationProducts.map((product, key) => (
                  <tr>
                    <td
                      className={`${classes.tableElement} ${
                        classes.infoBlockthClass
                      }`}
                    >
                      {key + 1}
                    </td>
                    <td
                      className={`${classes.tableElement} ${
                        classes.infoBlockthClass
                      }`}
                    >
                      {product.title}
                    </td>
                    <td
                      className={`${classes.tableElement}  ${
                        classes.infoBlockthClass
                      }`}
                    >
                      {product.description}
                    </td>
                    <td
                      className={`${classes.tableElement}  ${
                        classes.infoBlockthClass
                      }`}
                    >
                      <div contenteditable="true" />
                    </td>
                    <td
                      className={`${classes.tableElement} ${
                        classes.infoBlockthClass
                      }`}
                    >
                      {product.brand}
                    </td>
                    <td
                      className={`${classes.tableElement}  ${
                        classes.infoBlockthClass
                      }`}
                    >
                      {product.requiredQty}
                    </td>
                    <td
                      className={`${classes.tableElement}  ${
                        classes.infoBlockthClass
                      }`}
                    >
                      {product.price}
                    </td>
                    <td
                      className={`${classes.tableElement}  ${
                        classes.infoBlockthClass
                      }`}
                    >
                      Ready Stock
                    </td>

                    <td
                      className={`${classes.tableElement} ${
                        classes.infoBlockthClass
                      }`}
                    >
                      Ok
                    </td>
                  </tr>
                ))}
                <tr className="last">
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`}>
                    <span className={classes.infoBlocktrLasttdspanClass}>
                      Sub Total
                    </span>
                  </td>
                  <td className={`${classes.infoBlocktrLasttdClass}`}>
                    {this.getSubTotal()}
                  </td>
                </tr>
                <tr className="last">
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`} />
                  <td className={`${classes.infoBlocktrLasttdClass}`}>
                    <span className={classes.infoBlocktrLasttdspanClass}>
                      Discount:
                    </span>
                  </td>
                  <td className={`${classes.infoBlocktrLasttdClass}`}>
                    {this.state.discountPercentage + '%'}
                  </td>
                </tr>
                <tr className="last grand">
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass} />
                  <td className={classes.infoBlocktrLastGrandtdClass}>
                    <span className={classes.infoBlocktrLasttdspanClass}>
                      Grand Total:
                    </span>
                  </td>
                  <td className={classes.infoBlocktrLastGrandtdClass}>
                    {this.getGrandTotal()}
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.QoutationReducer.selectedCustomers,
    qoutationProducts: state.QoutationReducer.qoutationProducts,
  };
};
QuotationPDF = withStyles(styles)(QuotationPDF);

export default connect(
  mapStateToProps,
  null,
)(QuotationPDF);
