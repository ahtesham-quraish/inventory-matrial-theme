import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Qoutation from './Qoutation';
import ReactToPrint from 'react-to-print';
import QuotationPDF from './QoutationPDF';

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
        <QuotationPDF ref={(el) => (this.componentRef = el)} />
        <ReactToPrint
          copyStyles={true}
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />

        <Qoutation />
      </React.Fragment>
    );
  }
}

QuotationContainer = withStyles(styles)(QuotationContainer);
export default QuotationContainer;
