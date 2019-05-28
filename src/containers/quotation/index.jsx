import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Qoutation from './Qoutation';
import ReactToPrint from 'react-to-print';
import QuotationPDF from './QoutationPDF';
import Button from 'components/CustomButtons/Button.jsx';

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
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
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
QuotationContainer = withStyles(styles)(QuotationContainer);
export default connect(
  mapStateToProps,
  null,
)(QuotationContainer);
