import React from 'react';
import InvoicePDF from './invoicePDF';
import Quotation from '../quotation/Qoutation';
import ReactToPrint from 'react-to-print';
class Invoice extends React.Component {
  render() {
    return (
      <React.Fragment>
        <InvoicePDF ref={(el) => (this.componentRef = el)} />
        <ReactToPrint
          copyStyles={true}
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <Quotation />
      </React.Fragment>
    );
  }
}

export default Invoice;
