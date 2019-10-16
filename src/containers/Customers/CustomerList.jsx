import React from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import getAllCustomers from './actions/getCustomers';
import deleteCustomer from './actions/deleteCustomer';
import customersDataSelector from './selectors/customersListSelector';
import setCustomerId from './actions/setCustomerId';
import RegularButton from '../../components/CustomButtons/Button';
import Checkbox from '@material-ui/core/Checkbox';
import UserTransaction from '../bank/userTransaction';
import { customerBelence } from '../../helpers/util';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BankActions from '../bank/actions';
import _ from 'lodash'
const { getTransaction } = BankActions;

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
  },
  pointer: {
    cursor: 'pointer',
  },
  link: {
    cursor: 'pointer',
    color: '#0000EE',
  },
};

class CustomerListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: false,
      buyer: false,
      bankModelOpenState: false,
      CustomerType: null,
      customerId: null,
    };
    this.rowClickhandler = this.rowClickhandler.bind(this);
  }
  componentDidMount() {
    this.props.getTransaction().then(() => {
      this.props.getAllCustomers();
    });


  }
  handleCancelClick = () => {
    this.setState({ bankModelOpenState: false, customerId: null });
  };
  showCustomerTransaction = (e, value, key) => {
    const { cusotmersRawData } = this.props;
    let CustomerType = null;
    if (cusotmersRawData) {
      cusotmersRawData.forEach((element) => {
        if (element.id === value[1]) {
          CustomerType = element.customer_type;
        }
      });
    }
    this.props.setCustomerId(value[1]);
    this.setState({
      bankModelOpenState: true,
      customerId: value[1],
      CustomerType,
    });
  };
  rowClickhandler = (e, props, key) => {
    this.props.setCustomerId(props[1]);
    this.props.history.push(`/admin/user?id=${props[1]}`);
  };
  onInvoicesClick = (e, props, key) => {
    this.props.setCustomerId(props[1]);
    this.props.history.push(`/admin/all-invoice/${props[1]}`);
  };
  handleSupplierChange = (event, name) => {
    let { state } = this;
    this.setState({ ...state, [name]: event.target.checked, buyer: false });
  };
  handleBuyerChange = (event, name) => {
    let { state } = this;
    this.setState({ ...state, [name]: event.target.checked, supplier: false });
  };
  prepareData = () => {
    const { cusotmersRawData } = this.props;
    const { supplier, buyer } = this.state;
    const data = [];
    let phone = null;
    let balanceData = { Belence: '0' };
    const { transactions, CustomerType, custTransaction } = this.props;
    if (cusotmersRawData) {
      if (supplier && !buyer) {
        cusotmersRawData.reduce((index, val) => {
          if (
            val.customer_type === 'Supplier' &&
            val.customer_type !== 'Owner'
          ) {
            balanceData = { Belence: '0' };
            let customerTrans = {};
            for (let trans in transactions) {
              if (transactions[trans].customer.id === val.id) {
                customerTrans[trans] = transactions[trans];
              }
            }
            if (!_.isEmpty(customerTrans)) {
              balanceData = customerBelence(transactions, val.customer_type, customerTrans);
            }
            phone = val.Phone;
            phone = phone ? phone.toString() : 'N/A';

            return data.push([
              `${val.customer_type} `,
              val.id,
              `Rs${balanceData.Belence}`,
              phone,
              val.email,
              val.company_name,
              'Invoices',
            ]);
          }
        }, 0);
      } else if (!supplier && buyer) {
        cusotmersRawData.reduce((index, val) => {

          if (val.customer_type === 'Buyer' && val.customer_type !== 'Owner') {
            balanceData = { Belence: '0' };
            let customerTrans = {};
            for (let trans in transactions) {
              if (transactions[trans].customer.id === val.id) {
                customerTrans[trans] = transactions[trans];
              }
            }
            if (!_.isEmpty(customerTrans)) {
              balanceData = customerBelence(transactions, val.customer_type, customerTrans);
            }
            phone = val.Phone;
            phone = phone ? phone.toString() : 'N/A';
            return data.push([
              `${val.customer_type} `,
              val.id,
              `Rs${balanceData.Belence}`,
              phone,
              val.email,
              val.company_name,
              'Invoices',
            ]);
          }
        }, 0);
      } else {
        cusotmersRawData.reduce((index, val) => {
          if (val.customer_type !== 'Owner') {
            balanceData = { Belence: '0' };
            let customerTrans = {};
            for (let trans in transactions) {
              if (transactions[trans].customer.id === val.id) {
                customerTrans[trans] = transactions[trans];
              }
            }
            if (!_.isEmpty(customerTrans)) {
              balanceData = customerBelence(transactions, val.customer_type, customerTrans);
            }

            phone = val.Phone;
            phone = phone ? phone.toString() : 'N/A';
            return data.push([
              `${val.customer_type} `,
              val.id,
              `Rs${balanceData.Belence}`,
              phone,
              val.email,
              val.company_name,
              'Invoices',
            ]);
          }
        }, 0);
      }
    }

    return data;
  };
  onDeleteClick = (e, props, key) => {
    this.props.deleteCustomer(props[1]).then(() => {
      this.props.getAllCustomers();
    })
  }
  render() {
    const { classes } = this.props;
    const { supplier, buyer } = this.state;
    console.log(this.state.customerId);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              onClick={() => this.props.history.push('/admin/user')}
              color="primary"
              size="sm"
            >
              Add Customer{' '}
            </RegularButton>
          </div>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={supplier}
                  onChange={(e) => this.handleSupplierChange(e, 'supplier')}
                  label="Gilad Gray"
                  value={'supplier'}
                  inputProps={{
                    'aria-label': 'primary checkbox',
                  }}
                />
              }
              label="Supplier"
            />
          </div>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={buyer}
                  onChange={(e) => this.handleBuyerChange(e, 'buyer')}
                  label="Gilad Gray"
                  value={'buyer'}
                  inputProps={{
                    'aria-label': 'primary checkbox',
                  }}
                />
              }
              label="Buyers"
            />
          </div>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Customers List</h4>
              <p className={classes.cardCategoryWhite}>
                Complete list of all the customers
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Name',
                  'Customer ID',
                  'Amount Due',
                  'Phone#',
                  'Email',
                  'Company Name',
                  'Invoices',
                  'Action',
                ]}
                tableData={this.prepareData()}
                onClick={this.showCustomerTransaction}
                pointer={classes.pointer}
                deleteClick={this.onDeleteClick}
                className={classes.link}
                onInvoicesClick={this.onInvoicesClick}
                editClick={this.rowClickhandler}
              />
            </CardBody>
          </Card>
        </GridItem>
        {this.state.customerId && (
          <UserTransaction
            bankModelOpenState={this.state.bankModelOpenState}
            customerId={this.state.customerId}
            handleCancelClick={this.handleCancelClick}
            CustomerType={this.state.CustomerType}
          />
        )}
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: customersDataSelector(state),
    cusotmersRawData: state.CustomerState.customers,
    transactions: state.BankState.transactions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteCustomer: (id) => dispatch(deleteCustomer(id)),
    getAllCustomers: () => dispatch(getAllCustomers()),
    setCustomerId: (id) => dispatch(setCustomerId(id)),
    getTransaction: () => dispatch(getTransaction()),
  };
};
CustomerListContainer = withStyles(styles)(CustomerListContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerListContainer);
