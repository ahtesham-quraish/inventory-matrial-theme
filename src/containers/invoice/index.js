import React from 'react';
import { connect } from 'react-redux';
import InvoicePDF from './invoicePDF';
import Quotation from '../quotation/Qoutation';
import ReactToPrint from 'react-to-print';
import Button from 'components/CustomButtons/Button.jsx';
import saveInvoice from './actions/saveInvoice';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      waiting: false,
    };
  }
  saveInvoice = () => {
    this.setState({
      waiting: true,
    });
    let payload = {
      customer: this.props.customer,
      products: this.props.qoutationProducts,
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

  render() {
    return (
      <React.Fragment>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />
        <InvoicePDF
          ref={(el) => (this.componentRef = el)}
          customer={this.props.customer}
          qoutationProducts={this.props.qoutationProducts}
        />

        <div
          style={{ marginTop: '10px', margin: '0 auto', maxWidth: '1200px' }}
        >
          <div hidden={this.state.isSaved}>
            <Quotation />
          </div>

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveInvoice: (payload) => dispatch(saveInvoice(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Invoice);
