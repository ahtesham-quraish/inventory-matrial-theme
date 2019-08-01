import React from 'react';
import { connect } from 'react-redux';
import UpdateInvoicePDF from './updateInvoicePdf';
import Quotation from '../quotation/Qoutation';
import ReactToPrint from 'react-to-print';
import Button from 'components/CustomButtons/Button.jsx';
import saveInvoice from './actions/saveInvoice';
import getInvoiceByID from './actions/getInvoiceByID';
import invoicePDFChangeHandler from './actions/invoicePDFChangeHandle';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class UpdateInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      waiting: false,
    };
  }
  componentDidMount = () => {
    this.props.getInvoiceByID('9').then(() => {
      console.log('received invoice is ', this.props.invoiceByID.products);
    });
  };
  saveInvoice = () => {
    this.setState({
      waiting: true,
    });
    let payload = {
      customer: this.props.customer,
      products: this.props.qoutationProducts,
      invoiceInputs: this.props.invoicePDFInputs,
    };
    console.log('saved', payload);
    this.props.saveInvoice(payload).then(() => {
      if (this.props.savedInvoice.status === 201) {
        this.setState({
          isSaved: true,
          waiting: false,
        });
        toast.success('Invoice successfully saved. You can print invoice now.');
      } else {
        this.setState({
          waiting: false,
        });
        toast.error('Invoice could not be saved');
      }
    });
  };

  handleInvoiceChange = (event) => {
    console.log('changing ', event.target.id);
    let payload = {
      type: 'INVOICE_INPUTS_CHANGE_HANDLE',
      payload: {
        field: event.target.id,
        value: event.target.value,
      },
    };
    this.props.invoicePDFChangeHandler(payload).catch((e) => {
      throw e;
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />
        <UpdateInvoicePDF
          ref={(el) => (this.componentRef = el)}
          customer={this.props.customer}
          qoutationProducts={this.props.qoutationProducts}
          handleInvoiceChange={this.handleInvoiceChange}
          invoicePDFInputs={this.props.invoicePDFInputs}
          invoiceByID={this.props.invoiceByID}
        />

        <div style={{ marginTop: '10px' }}>
          <div hidden={this.state.isSaved}>{/* <Quotation /> */}</div>

          <div>
            <div hidden={!this.state.isSaved}>
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
            <div style={{ margin: '10px 10px' }} hidden={this.state.isSaved}>
              <Button
                color="primary"
                size="md"
                onClick={this.saveInvoice}
                disabled={this.state.waiting}
              >
                {!this.state.waiting ? (
                  'Save Invoice'
                ) : (
                  <div style={{ width: '75px' }}>
                    <Loader
                      type="ThreeDots"
                      color="white"
                      height={1000}
                      width={1000}
                    />
                  </div>
                )}
              </Button>
            </div>
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
    savedInvoice: state.InvoiceReducer.savedInvoice,
    invoiceByID: state.InvoiceReducer.invoiceByID,
    invoicePDFInputs: state.InvoiceReducer.invoicePDFInputs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInvoiceByID: (payload) => dispatch(getInvoiceByID(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateInvoice);
