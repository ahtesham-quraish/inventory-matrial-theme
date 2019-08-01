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
      temp.push(element.products.length);
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
    // const { cusotmersRawData } = this.props;
    // this.props.setCustomerId(cusotmersRawData[key].id);
    // this.props.history.push(`/admin/user?id=${cusotmersRawData[key].id}`);
    let id = this.props.invoices[key].id;
    this.props.history.push('/admin/update-invoices/' + id);
  };
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
                  tableHead={['Customer', 'No. of Products', 'Date Created']}
                  tableData={this.prepareTableData()}
                  onClick={this.rowClickhandler}
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
  };
};
const InvoicesListWithStyles = withStyles(styles)(InvoiceList);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoicesListWithStyles);
