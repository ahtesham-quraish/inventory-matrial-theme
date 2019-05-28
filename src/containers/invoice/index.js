import React from 'react';
import { connect } from 'react-redux';
import InvoicePDF from './invoicePDF';
import Quotation from '../quotation/Qoutation';
import ReactToPrint from 'react-to-print';
import Button from 'components/CustomButtons/Button.jsx';
class Invoice extends React.Component {
  render() {
    return (
      <React.Fragment>
        <InvoicePDF
          ref={(el) => (this.componentRef = el)}
          customer={this.props.customer}
          qoutationProducts={this.props.qoutationProducts}
        />

        <div style={{ marginTop: '10px' }}>
          <Quotation />
          <ReactToPrint
            copyStyles={true}
            trigger={() => (
              <Button color="primary" size="md">
                Print this out
              </Button>
            )}
            content={() => this.componentRef}
          />
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

export default connect(mapStateToProps)(Invoice);
