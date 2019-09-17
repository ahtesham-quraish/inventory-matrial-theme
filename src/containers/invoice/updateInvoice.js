import React from 'react';
import { connect } from 'react-redux';
import UpdateInvoicePDF from './updateInvoicePdf';
import Quotation from '../quotation/Qoutation';
import ReactToPrint from 'react-to-print';
import Button from 'components/CustomButtons/Button.jsx';
import saveInvoice from './actions/saveInvoice';
import getInvoiceByID from './actions/getInvoiceByID';
import invoicePDFChangeHandler from './actions/invoicePDFChangeHandle';
import updateInvoice from './actions/updateInvoice';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  pointer: {
    cursor: 'pointer',
  },
  logowidth: {
    width: '100%',
  },
  containerbackground: {
    background: 'light grey',
  },
  margin: {
    margin: '10px 10px',
  },
};

class UpdateInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      waiting: false,
      paymentTypeOptions: [],
      selectedType: null,
      receivedAmount: '',
    };
  }
  componentDidMount = () => {
    let id = this.props.match.params.invoice_id;
    this.props.getInvoiceByID(id).then(() => {
      let types = [
        { label: 'Unpaid', value: 'Unpaid' },
        { label: 'Paid', value: 'Paid' },
      ];

      this.setState({
        paymentTypeOptions: types,
        selectedType: {
          label: this.props.invoiceByID.invoice.status,
          value: this.props.invoiceByID.invoice.status,
        },
        receivedAmount: this.props.invoiceByID.invoice.residualPayment,
      });
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

  handlePaymentSelect = (selected) => {
    this.setState({
      selectedType: selected,
    });
  };
  handleAmountRecivedchange = (e) => {
    this.setState({
      receivedAmount: e.target.value,
    });
  };

  handleUpdateClick = () => {
    let payload = {
      id: this.props.invoiceByID.invoice.id,
      status: this.state.selectedType.value,
      amount: this.state.receivedAmount === '' ? 0 : this.state.receivedAmount,
    };
    this.setState({
      waiting: true,
    });
    this.props
      .updateInvoice(payload)
      .then(() => {
        this.props.history.push('/admin/all-invoice');
      })
      .catch(() => {
        toast.error('Invoice could not be updated');
      });
  };

  render() {
    const { classes } = this.props;

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
            <GridContainer>
              <GridItem xs={12} sm={8} md={4}>
                <Select
                  className={classes.margin}
                  placeholder="Select Product"
                  value={this.state.selectedType}
                  onChange={this.handlePaymentSelect}
                  options={this.state.paymentTypeOptions}
                />
              </GridItem>
              <GridItem xs={12} sm={8} md={4}>
                <CustomInput
                  labelText="Residual amount"
                  id="amount"
                  type="number"
                  error={false}
                  helpText="Description is required"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleAmountRecivedchange,
                    value: this.state.receivedAmount,
                  }}
                />
              </GridItem>
            </GridContainer>

            <div style={{ margin: '10px 10px' }} hidden={this.state.isSaved}>
              <Button
                color="primary"
                size="md"
                onClick={this.handleUpdateClick}
                disabled={this.state.waiting}
              >
                {!this.state.waiting ? (
                  'Update Invoice'
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
    updateInvoice: (payload) => dispatch(updateInvoice(payload)),
  };
};
UpdateInvoice = withStyles(styles)(UpdateInvoice);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateInvoice);
