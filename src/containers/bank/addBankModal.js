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

const { getBanks, getCategory, createTransaction } = BankActions;
const EmptyTransaction = {
  date: '',
  bank_account: '',
  type: '',
  category: '',
  description: '',
  entry_method: '',
  description: '',
  isSuperAdmin: false,
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
  { value: 'Customer Receipt', label: 'Customer Receipt' },
  { value: 'Supplier Payment', label: 'Supplier Payment' },
  { value: 'Customer Invoice', label: 'Customer Invoice' },
  { value: 'Supplier Invoice', label: 'Supplier Invoice' },
];
class AddBankModal extends React.Component {
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
      bankOption: null,
      transaction: { ...EmptyTransaction },
    };
  }
  componentDidMount() {
    this.props.getAllCustomers();
    this.props.getBanks().then(() => {
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
  onInvoiceChange = (invoiceOption) => {
    const { transaction } = this.state;
    transaction.invoiceId = invoiceOption.value;
    this.setState({ invoiceOption, transaction });
  };
  createCustomerOptions = (key) => {
    const { customers } = this.props;

    const customersOptions = [];
    if (customers) {
      customers.forEach((customer) => {
        if (customer.customer_type === key) {
          customersOptions.push({
            value: customer.id,
            label: `${customer.category} | ${customer.fName} ${customer.lName}`,
          });
        }
      });
    }

    return customersOptions;
  };
  onChangeCategory = (categoryOption) => {
    const { categories } = this.props;
    const { transaction, typesOption } = this.state;
    if (
      typesOption.value === 'Customer Receipt' ||
      typesOption.value === 'Supplier Payment' ||
      typesOption.value === 'Customer Invoice' ||
      typesOption.value === 'Supplier Invoice'
    ) {
      this.props.getInvoice(categoryOption.value.toString()).then(() => {
        const { invoices } = this.props;
        const invoicesOptions = [];
        if (invoices) {
          invoices.forEach((invoice) => {
            invoicesOptions.push({
              value: invoice.id,
              label: `${invoice.id} | ${new Date(
                invoice.dateCreated,
              ).toLocaleDateString()} | ${
                invoice.products[0].invoice.grandTotal
              }`,
            });
          });
        }
        this.setState({ invoicesOptions });
      });
      const customerLabelArray = categoryOption.label.split('|');
      transaction.customer = categoryOption.value.toString();
      transaction.isSuperAdmin = false;
      transaction.category = parseInt(customerLabelArray[0].trim());
    } else {
      transaction.isSuperAdmin = true;
      transaction.category = parseInt(categoryOption.value);
    }

    this.setState({ categoryOption, transaction });
  };
  onTransactionChange = (e) => {
    const { transaction } = this.state;
    transaction[e.target.id] = e.target.value;
    this.setState({ transaction });
  };
  onTypesChange = (typesOption) => {
    const { transaction } = this.state;
    if (
      typesOption.value === 'Customer Receipt' ||
      typesOption.value === 'Customer Invoice'
    ) {
      this.setState({
        categoryOptions: this.createCustomerOptions('Buyer'),
        categoryOption: null,
      });
    } else if (
      typesOption.value === 'Supplier Payment' ||
      typesOption.value === 'Supplier Invoice'
    ) {
      this.setState({
        categoryOptions: this.createCustomerOptions('Supplier'),
        categoryOption: null,
      });
    } else if (typesOption.value === 'Money Out') {
      this.setState({
        categoryOptions: this.createCategoryOptions(['Liability', 'Expense']),
        categoryOption: null,
      });
    } else if (typesOption.value === 'Money In') {
      this.setState({
        categoryOptions: this.createCategoryOptions([
          'Revenue',
          'Asset',
          'Equity',
        ]),
        categoryOption: null,
      });
    }
    transaction.type = typesOption.value;
    this.setState({ typesOption, transaction });
  };
  onBankChange = (bankOption) => {
    const { transaction } = this.state;
    transaction.bank_account = bankOption.value.toString();
    this.setState({ bankOption, transaction });
  };
  createTransaction = () => {
    const { transaction } = this.state;
    this.setState({ loading: true });
    this.props.createTransaction(transaction).then(() => {
      this.setState({ loading: false, transaction: { ...EmptyTransaction } });
      this.props.handleCancelClick();
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.transModelOpenState}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Transaction</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={16} sm={16} md={12}>
              <Card style={{ width: '500px' }}>
                <CardHeader color="primary">Enter Transaction</CardHeader>
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
                      <Select
                        placeholder="Select Bank "
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        onChange={this.onBankChange}
                        value={this.state.bankOption}
                        options={this.state.bankOptions}
                        isMulti={false}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Select
                        placeholder="Cash FLow Type"
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        options={typesOptions}
                        value={this.state.typesOption}
                        onChange={this.onTypesChange}
                        isMulti={false}
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
                    <GridItem xs={12} sm={12} md={12}>
                      <Select
                        placeholder="Select Category "
                        style={{ marginTop: '40px' }}
                        className={classes.unitSelect}
                        value={this.state.invoiceOption}
                        options={this.state.invoicesOptions}
                        onChange={this.onInvoiceChange}
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
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Button
                        onClick={this.props.onAddCategory}
                        color="primary"
                        size="sm"
                      >
                        Invoices
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
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
              'Enter Transaction'
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

const styledCompoenet = withStyles(styles)(AddBankModal);
const mapStateToProps = (state) => {
  return {
    categories: state.BankState.categories,
    banks: state.BankState.banks,
    customers: state.CustomerState.customers,
    invoices: state.InvoiceReducer.invoices,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: () => dispatch(getAllCustomers()),
    getBanks: () => dispatch(getBanks()),
    getCategory: () => dispatch(getCategory()),
    createTransaction: (body) => dispatch(createTransaction(body)),
    getInvoice: (id) => dispatch(getInvoice(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledCompoenet);
