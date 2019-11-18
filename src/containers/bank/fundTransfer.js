import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as DialogButton } from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import { ToastContainer, toast } from 'react-toastify';
import getAllCustomers from '../Customers/actions/getCustomers';
import Loader from 'react-loader-spinner';
import BankActions from '../bank/actions/index';
import { getInvoice } from '../invoice/actions/getInvoices';
import {getBankDetail} from '../../helpers/util';

const { getBanks, getCategory, createTransaction, getTransaction } = BankActions;
const EmptyTransaction = {
  date: '',
  bank_account_from: '',
  bank_account_to: '',
  type: '',
  customer : null,
  category: '',
  description: '',
  entry_method: '',
  description: '',
};
const styles = {
  margin: {
    margin: '10px 10px',
  },
  auto: {
    width: 'auto',
  },
  unitSelect: {
    marginTop: '40px',
  },
};
const typesOptions = [
  { value: 'Money In', label: 'Money In' },
  { value: 'Money Out', label: 'Money Out' },
];
class FundTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bankMethodOption: null,
      categoryOptions: [],
      invoicesOptions: [],
      invoiceOption: null,
      categoryOption: null,
      bankOptions: [],
      bankOptionTo : [],
      bankOptionFrom : [],
      bankOption: null,
      transaction: { ...EmptyTransaction },
    };
  }
  componentDidMount() {

    this.props.getBanks().then(() => {
      this.props.getTransaction();
      const bankOptions = [];
      const { banks } = this.props;
      if (banks) {
        for (let bank in banks) {
          bankOptions.push({
            value: banks[bank].id,
            label: `${banks[bank].code} | ${banks[bank].name}`,
          });
        }
        this.setState({ bankOptions });
      }
    });
    this.props.getCategory().then(() => {
      const categoryOptions = [];
      const { categories } = this.props;
      if (categories) {
        for (let category in categories) {
          categoryOptions.push({
            value: categories[category].id,
            label: `${categories[category].code} | ${
              categories[category].name
              }`,
          });
        }
        this.setState({ categoryOptions });
      }
    });
  }
  createCategoryOptions = (keys) => {
    const { categories } = this.props;
    const categoriesOptions = [];
    if (categories) {
      for (let category in categories) {
        if (keys.includes(categories[category].title)) {
          categoriesOptions.push({
            value: categories[category].id,
            label: `${categories[category].code} | ${
              categories[category].name
              }`,
          });
        }
      }
    }
    return categoriesOptions;
  };
  onChangeCategory = (categoryOption) => {
    const { categories } = this.props;
    const { transaction, typesOption } = this.state;
          transaction.isSuperAdmin = true;
      transaction.category = parseInt(categoryOption.value);
    this.setState({ categoryOption, transaction });
  };
  onTransactionChange = (e) => {
    const { transaction } = this.state;
    transaction[e.target.id] = e.target.value;
    this.setState({ transaction });
  };
  onBankChange = (bankOption, key) => {
    let readyData = []; 
    let { transaction, bankOptionFrom, bankOptionTo} = this.state;
    const {transactions} = this.props
    transaction[key] = bankOption.value.toString();
    if(key === 'bank_account_to'){
      bankOptionTo = bankOption;
    }else{
      readyData = getBankDetail(transactions, parseInt (transaction.bank_account_from))
      bankOptionFrom = bankOption;
    }
    if(transaction.bank_account_from === transaction.bank_account_to){
      bankOptionTo = [];
    }
    this.setState({ bankOptionFrom, bankOptionTo, transaction });
  };
  validate =  (bankOutId) => {
    if(!bankOutId){
      return false;
    }
    const { transaction} = this.state;
    const {transactions} = this.props;
    const readyData = getBankDetail(transactions, parseInt (bankOutId))
    if(transaction.bank_account_from === ''  || transaction.bank_account_to === '' ||
     transaction.amount === "" || ( readyData.length > 0 && readyData[readyData.length-1][7].substring(2) > 0  &&
      readyData[readyData.length-1][7].substring(2) > parseInt( transaction.bank_account_to) )   ){
      return false;
    }
    return true;
  }
  createTransaction = () => {
    const { transaction } = this.state;
    const {amount, date, description, category, bank_account_from, bank_account_to } = transaction;
    const transferOutTrans = {amount, bank_account : bank_account_from, category, description, date, isSuperAdmin : true, type : 'Money Out', customers : null}
    const transferInTrans = {amount, bank_account : bank_account_to, category, description, date, isSuperAdmin : true, type : 'Money In', customers : null}
    if(!this.validate(bank_account_to)){
      return false
    }
    this.setState({ loading: true });
    this.props.createTransaction(transferOutTrans).then(() => {
      this.props.createTransaction(transferInTrans).then(() => {
      this.setState({ loading: false, transaction: { ...EmptyTransaction } });
      this.props.handleCancelClick(transaction);
      });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.fundTransferOpen}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Fund Transder</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={16} sm={16} md={12}>
              <Card style={{ width: '500px' }}>
                <CardHeader color="primary">Transfer</CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Date"
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        helpText="2017-05-24"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.onTransactionChange,
                          value: this.state.transaction.date,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Amount"
                        id="amount"
                        type="text"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.onTransactionChange,
                          value: this.state.transaction.amount,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                      <Select
                        placeholder="Select Bank Transfer From "
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        onChange={(option) => this.onBankChange(option, 'bank_account_from')}
                        value={this.state.bankOptionFrom}
                        options={this.state.bankOptions}
                        isMulti={false}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Select
                        placeholder="Select Bank Transfer To "
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        onChange={(option) => this.onBankChange(option, 'bank_account_to')}
                        value={this.state.bankOptionTo}
                        options={this.state.bankOptions}
                        isMulti={false}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Select
                        placeholder="Select Category "
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        value={this.state.categoryOption}
                        options={this.state.categoryOptions}
                        onChange={this.onChangeCategory}
                        isMulti={false}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={24} sm={24} md={12}>
                      <CustomInput
                        labelText="Product Description"
                        id="description"
                        type="textarea"
                        helpText="Description is required"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.onTransactionChange,
                          value: this.state.transaction.description,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.handleCancelClick} color="warning">
            Cancel
          </Button>
          <Button onClick={this.createTransaction} color="primary">
            {!this.props.loading ? (
              'Transfer Fund'
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
        </DialogActions>
      </Dialog>
    );
  }
}

const styledCompoenet = withStyles(styles)(FundTransfer);
const mapStateToProps = (state) => {
  return {
    categories: state.BankState.categories,
    banks: state.BankState.banks,
    customers: state.CustomerState.customers,
    invoices: state.InvoiceReducer.invoices,
    transactions: state.BankState.transactions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: () => dispatch(getAllCustomers()),
    getBanks: () => dispatch(getBanks()),
    getCategory: () => dispatch(getCategory()),
    createTransaction: (body) => dispatch(createTransaction(body)),
    getTransaction: () => dispatch(getTransaction()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledCompoenet);
