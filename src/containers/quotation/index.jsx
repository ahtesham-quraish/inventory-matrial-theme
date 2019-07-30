import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Qoutation from './Qoutation';
import ReactToPrint from 'react-to-print';
import QuotationPDF from './QoutationPDF';
import sendPDFViaEmail from './actions/sendPDFViaEmail';
import Button from 'components/CustomButtons/Button.jsx';
//import Pdf from 'react-to-pdf';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
// const electron = window.require('electron');
// const ipc = electron.ipcRenderer;

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
    background: 'white',
  },
};
class QuotationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrintable: true,
      selectedPDF: null,
      sendingEmail: false,
    };
  }

  handlePDFSelect = () => {
    document.getElementById('pdf').click();
  };

  sendEmail = () => {
    this.setState({
      sendingEmail: true,
    });
    let file = document.getElementById('pdf').files[0];
    var form = new FormData();
    if (this.props.customer !== null) {
      form.append('user_id', this.props.customer.id);
    }

    form.append('file', file);
    this.props.sendPDFViaEmail(form).then(() => {
      if (this.props.pdf_email_response.status === 200) {
        toast.success(
          'Qoutation emailed to ' +
            this.props.customer.fName +
            ' ' +
            this.props.customer.lName,
        );
        this.setState({
          sendingEmail: false,
        });
      } else if (this.props.pdf_email_response.status === 406) {
        toast.error('Please select a recipient');
        this.setState({
          sendingEmail: false,
        });
      } else if (this.props.pdf_email_response.status === 406) {
        toast.error('Please select a file');
        this.setState({
          sendingEmail: false,
        });
      } else {
        toast.error('Qoutation could not be emailed');
        this.setState({
          sendingEmail: false,
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ToastContainer />
        <QuotationPDF
          ref={(el) => (this.componentRef = el)}
          qoutationProducts={this.props.qoutationProducts}
          customer={this.props.customer}
        />
        <div style={{ marginTop: '10px' }}>
          <Qoutation />
          <ReactToPrint
            copyStyles={true}
            trigger={() => (
              <Button style={{ margin: '18px 0px' }} color="primary" size="md">
                Print this out
              </Button>
            )}
            content={() => this.componentRef}
          />
          <Button color="primary" size="md" onClick={this.handlePDFSelect}>
            {!this.state.sendingEmail ? 'Send Via Email' : 'Sending...'}
          </Button>
          <input
            type="file"
            id="pdf"
            value={this.state.selectedPDF}
            hidden={true}
            onChange={this.sendEmail}
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
    pdf_email_response: state.QoutationReducer.pdf_email_response,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendPDFViaEmail: (payload) => dispatch(sendPDFViaEmail(payload)),
  };
};
QuotationContainer = withStyles(styles)(QuotationContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuotationContainer);
