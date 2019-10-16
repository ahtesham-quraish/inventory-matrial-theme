import React from 'react';
import { connect } from 'react-redux';
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardIcon from '../../components/Card/CardIcon.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import Table from '../../components/Table/Table.jsx';
import Tasks from '../../components/Tasks/Tasks.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx';
import Danger from '../../components/Typography/Danger.jsx';
import Card from '../../components/Card/Card.jsx';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import { bugs, website, server } from '../../variables/general';
import RegularButton from '../../components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as DialogButton } from '@material-ui/core/Button';
import Button from '../../components/CustomButtons/Button.jsx';
import TextField from '@material-ui/core/TextField';
import AddBankModal from './addBankModal';
import BankCreateModel from './bankCreateModel';
import CreateCategory from './createCategory';
import BankActions from './actions';
import BankList from './bankList';
import { customerBelence } from '../../helpers/util';
import updateInvoice from '../invoice/actions/updateInvoice';
import _ from 'lodash';
const { createBank, getBanks, getTransaction, deleteTransaction } = BankActions;

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
  link: {
    cursor: 'pointer',
    color: '#0000EE',
  },
};
const typesOptions = [
  { value: '500-998', label: 'Expense (500 - 998)' },
  { value: '0-199', label: 'Asset (0 - 199)' },
  { value: '400-499', label: 'Revenue (400 - 499)' },
  { value: '200-299', label: 'Liability (200 - 299)' },
  { value: '300-399', label: 'Equity (300 - 399)' },
];
class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transModelOpen: false,
      bankModelOpenState: false,
      categoryModelOpenState: false,
    };
  }

  transModelOpen = () => {
    this.setState({ transModelOpen: true });
  };
  categoryModelOpen = () => {
    this.setState({ categoryModelOpenState: true });
  };
  bankModelOpen = () => {
    this.setState({ bankModelOpenState: true });
  };
  handleCancelClick = (transaction) => {

    this.setState({
      transModelOpen: false,
      bankModelOpenState: false,
      categoryModelOpenState: false,
    });
    this.props.getTransaction().then(() => {
      if (transaction && !transaction.isSuperAdmin) {
        let balanceData = null;
        const { transactions } = this.props;
        let customerTrans = {};
        for (let trans in transactions) {
          if (transactions[trans].customer.id === parseInt(transaction.customer) &&
            parseInt(transaction.invoiceId) === parseInt(transactions[trans].invoiceId)) {
            customerTrans[trans] = transactions[trans];
          }
        }
        if (!_.isEmpty(customerTrans)) {
          balanceData = customerBelence(transactions, transaction.type.includes('Supplier') ? 'Supplier' : 'Buyer', customerTrans);
          if (balanceData.Belence !== 0) {
            let payload = {
              id: transaction.invoiceId,
              status: 'UnPaid',
            };
            this.props
              .updateInvoice(payload);

          }
          else {
            let payload = {
              id: transaction.invoiceId,
              status: 'Paid',
            };
            this.props
              .updateInvoice(payload);
          }
        }
      }


    });
  };
  transModelOpen = () => {
    this.setState({ transModelOpen: true });
  };
  componentDidMount() {
    this.props.getTransaction();
  }
  prepareTableData = () => {
    const { transactions } = this.props;
    let data = [];
    let temp = [];
    for (let transaction in transactions) {
      if (transactions[transaction].isSuperAdmin) {
        temp.push(transactions[transaction].category.name);
      } else {
        temp.push(
          `${transactions[transaction].customer.fName} ${
          transactions[transaction].customer.lName
          }`,
        );
      }

      temp.push(transactions[transaction].type);
      temp.push(`${transactions[transaction].id} | ${transactions[transaction].bank_account.entry_method}`);
      temp.push(` ${transactions[transaction].description}`);
      temp.push(transactions[transaction].date);
      temp.push(transactions[transaction].amount);
      data.push(temp);
      temp = [];
    }
    return data;
  };
  onDeleteClick = (e, props, key) => {
    const id = props[2].split('|');
    this.props.deleteTransaction(id[0].trim()).then(() => {
      this.props.getTransaction();
    });

  };
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              color="primary"
              size="sm"
              onClick={this.bankModelOpen}
            >
              Add Bank{' '}
            </RegularButton>
          </div>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              onClick={this.transModelOpen}
              color="primary"
              size="sm"
            >
              Add Transaction{' '}
            </RegularButton>
          </div>
          <div style={{ float: 'right', marginBottom: '5%' }}>
            <RegularButton
              onClick={this.categoryModelOpen}
              color="primary"
              size="sm"
            >
              Add Category{' '}
            </RegularButton>
          </div>
          <Card className={'blue'}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Transactions</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Category',
                  'Transaction Type',
                  'Method',
                  'Description',
                  'Date',
                  'Total',
                  'Action',
                ]}
                tableData={this.prepareTableData()}
                onClick={this.handleRowClick}
                className={classes.link}
                deleteClick={this.onDeleteClick}
              />
            </CardBody>
          </Card>
        </GridItem>
        {this.state.transModelOpen && (
          <AddBankModal
            handleCancelClick={this.handleCancelClick}
            transModelOpen={this.transModelOpen}
            transModelOpenState={this.state.transModelOpen}
            onAddCategory={this.onAddCategoryHandler}
          />
        )}
        <BankCreateModel
          handleCancelClick={this.handleCancelClick}
          bankModelOpenState={this.state.bankModelOpenState}
        />
        <CreateCategory
          typesOptions={typesOptions}
          categoryModelOpenState={this.state.categoryModelOpenState}
          handleCancelClick={this.handleCancelClick}
        />
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.QoutationReducer.selectedCustomers,
    transactions: state.BankState.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBank: (body) => dispatch(createBank(body)),
    getBanks: () => dispatch(getBanks()),
    deleteTransaction: (id) => dispatch(deleteTransaction(id)),
    getTransaction: () => dispatch(getTransaction()),
    updateInvoice: (payload) => dispatch(updateInvoice(payload)),
  };
};
const styledCompoenet = withStyles(styles)(Bank);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledCompoenet);
