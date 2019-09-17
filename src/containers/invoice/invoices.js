import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import RegularButton from '../../components/CustomButtons/Button';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { connect } from 'react-redux';
import getInvoices, { getInvoice } from './actions/getInvoices';
import Loader from 'react-loader-spinner';
import deleteInvoice from './actions/deleteInvoice'
import _ from 'lodash';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  link: {
    cursor: 'pointer',
    color: '#0000EE',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
    customInput: {
      display: 'block',
      width: '100%',
      padding: '5px 5px',
    },
  },
};

class InvoiceList extends React.Component {
  componentDidMount = () => {
    const { selectedCustomerId } = this.props;
    if (selectedCustomerId) {
      this.props.getInvoice(selectedCustomerId);
      return;
    }

    this.props.getInvoices();
  };
  prepareTableData = () => {
    let products = this.props.invoices;

    let data = [];
    let temp = [];
    let dueDatetime = '';
    let formattedDueDatetime = '';
    let temp_invoice = {};
    products.forEach((element) => {
      temp.push(element.customer);

      if (element.products.length > 0) {
        temp.push(element.products[0].invoice.customer.customer_type);
        temp.push(element.products.length);
        temp.push(element.products[0].invoice.residualPayment);
        temp.push(element.products[0].invoice.grandTotal);
        temp.push(`${element.products[0].invoice.id} | ${element.products[0].invoice.status}`);

      } else {
        temp.push(element.products.length);
        temp.push('N/A');
        temp.push('N/A');
        temp.push('N/A');
      }

      dueDatetime = new Date(element.dateCreated);
      formattedDueDatetime =
        dueDatetime.getMonth() +
        1 +
        '/' +
        dueDatetime.getDate() +
        '/' +
        dueDatetime.getFullYear();
      temp.push(formattedDueDatetime);
      data.push(temp);
      temp = [];
    });
    return data;
  };
  rowClickhandler = (e, value, key) => {
    let id = this.props.invoices[key].id;
    this.props.history.push('/admin/update-invoices/' + id);
  };
  onDeleteClick = (e, props, key) => {
    const id = props[5].split('|');
    this.props.deleteInvoice(id[0].trim()).then(() => {
      const { selectedCustomerId } = this.props;
      if (selectedCustomerId) {
        this.props.getInvoice(selectedCustomerId);
        return;
      }

      this.props.getInvoices();
    })
  }

  render() {
    const { classes, product } = this.props;
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card data-background-color={'blue'}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>All Invoices</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    'Customer',
                    'Customer Type',
                    'No. of Products',
                    'Residual Amount',
                    'Total Amount',
                    'Invoice Status',
                    'Date Created',
                    'Action',
                  ]}
                  tableData={this.prepareTableData()}
                  onClick={this.rowClickhandler}
                  className={classes.link}
                  deleteClick={this.onDeleteClick}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invoices: state.InvoiceReducer.invoices,
    selectedCustomerId: state.CustomerState.customerId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInvoice: (id) => dispatch(getInvoice(id)),
    getInvoices: () => dispatch(getInvoices()),
    deleteInvoice: (id) => dispatch(deleteInvoice(id)),
  };
};
const InvoicesListWithStyles = withStyles(styles)(InvoiceList);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoicesListWithStyles);
